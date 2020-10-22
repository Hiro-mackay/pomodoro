import firebase from "firebase";
import firebaseApp from "@/utiles/firebaseCongig";

export type UserAuthenticationInfo = [firebase.User, string];

const hasuraClaimUrl = "https://hasura.io/jwt/claims";

const getUserSnapshot = async (
  user: firebase.User
): Promise<UserAuthenticationInfo> =>
  new Promise((resolve, reject) => {
    firebaseApp
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(
        async () => {
          console.log("create hasuraClaim token");
          const token = await user.getIdToken(true);
          resolve([user, token]);
        },
        (err) => {
          reject(err);
        }
      );
  });

export const getUserAuthenticationdataData = async (
  user: firebase.User
): Promise<UserAuthenticationInfo | void> => {
  if (!user) return;

  const token = await user.getIdToken();
  const idTokenResult = await user.getIdTokenResult();
  const hasuraClaim = idTokenResult.claims[hasuraClaimUrl];

  if (hasuraClaim) {
    return [user, token];
  } else {
    return await getUserSnapshot(user);
  }
};

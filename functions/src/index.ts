import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const createProfile = (user: admin.auth.UserRecord) => {
  return db
    .collection("users")
    .doc(user.uid)
    .set({ refreshTime: new Date().getTime() });
};

// On sign up.
exports.processSignUp = functions.auth.user().onCreate((user) => {
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      return createProfile(user);
    })
    .catch((error: any) => {
      console.log(error);
    });
});

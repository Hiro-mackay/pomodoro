import firebase from "firebase";
import firebaseApp from "@/utiles/firebaseCongig";
import {
  FirebaseAuthProvider,
  PROVIDER_TYPE,
} from "@/utiles/firebaseAuthProviderInterface";
import { FacebookProvider } from "./firebaseAuth/facebookProvider";
import { GoogleProvider } from "./firebaseAuth/googleProvider";
import { User } from "@/userCtx";
import {
  getUserAuthenticationdataData,
  UserAuthenticationInfo,
} from "./getUserAuthenticationdataData";

export class AuthProvider implements FirebaseAuthProvider {
  private auth: firebase.auth.Auth;
  private getProvider = (provider: PROVIDER_TYPE) => {
    switch (provider) {
      case "facebook":
        return new FacebookProvider();
      case "google":
        return new GoogleProvider();
      default:
        throw new Error(
          "The provider is wrong.You can only specify 'Facebook' or 'Google'"
        );
    }
  };

  constructor() {
    this.auth = firebaseApp.auth();
  }

  logIn = (providerType: PROVIDER_TYPE) =>
    this.getProvider(providerType).logIn();

  logOut = () => this.auth.signOut();

  onAuthState = () =>
    new Promise<UserAuthenticationInfo | void>((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged(
        async (user) => {
          unsubscribe();
          resolve(this.getUserAuthenData(user));
        },
        (error) => reject(error)
      );
    });

  getUserAuthenData = async (user: firebase.User | null) =>
    getUserAuthenticationdataData(user);

  toUserEntity = (user: firebase.User | null): User | null => {
    if (user === null) return null;

    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
    };
  };
}

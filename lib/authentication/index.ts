import firebase from "firebase";
import firebaseApp from "@/utiles/firebaseCongig";
import {
  FirebaseAuthProvider,
  PROVIDER_TYPE,
} from "@/utiles/firebaseAuthProviderInterface";
import { FacebookProvider } from "./firebaseAuth/facebookProvider";
import { GoogleProvider } from "./firebaseAuth/googleProvider";
import { User } from "@/userCtx";

export class AuthProvider implements FirebaseAuthProvider {
  private provider: GoogleProvider | FacebookProvider;
  private auth: firebase.auth.Auth;

  constructor() {
    this.auth = firebaseApp.auth();
  }

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

  logIn = (provider: PROVIDER_TYPE) => {
    try {
      this.provider = this.getProvider(provider);
      return this.provider.logIn();
    } catch (error) {
      throw error;
    }
  };

  logOut = () => this.auth.signOut();

  onAuthState = () =>
    new Promise<firebase.User>((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged(
        (user) => {
          unsubscribe();
          resolve(user);
        },
        (error) => reject(error)
      );
    });

  toUserEntity = (user: firebase.User | null): User | null => {
    if (user === null) return null;

    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
    };
  };
}

import firebase from "firebase";
import firebaseApp from "@/utiles/firebaseCongig";
import {
  FirebaseAuthProvider,
  PROVIDER_TYPE,
} from "@/utiles/firebaseAuthProviderInterface";
import { FacebookProvider } from "./firebaseAuth/facebookProvider";
import { GoogleProvider } from "./firebaseAuth/googleProvider";

export class AuthProvider implements FirebaseAuthProvider {
  private provider: GoogleProvider | FacebookProvider;
  private auth: firebase.auth.Auth;

  constructor(provider: PROVIDER_TYPE) {
    this.provider = this.getProvider(provider);
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

  logIn = () => this.provider.logIn();

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
}

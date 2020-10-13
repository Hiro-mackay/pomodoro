import firebase from "firebase";
import firebaseApp from "@/utiles/firebaseCongig";
import { FirebaseAuthSnsProvider } from "@/utiles/firebaseAuthProviderInterface";

export class GoogleProvider implements FirebaseAuthSnsProvider {
  private auth: firebase.auth.Auth;
  private provider: firebase.auth.GoogleAuthProvider;

  constructor() {
    this.auth = firebaseApp.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  logIn = () => this.auth.signInWithPopup(this.provider);
}

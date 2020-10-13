import firebase from "firebase";
import firebaseApp from "@/utiles/firebaseCongig";
import { FirebaseAuthSnsProvider } from "@/utiles/firebaseAuthProviderInterface";

export class FacebookProvider implements FirebaseAuthSnsProvider {
  private auth: firebase.auth.Auth;
  private provider: firebase.auth.FacebookAuthProvider;
  constructor() {
    this.auth = firebaseApp.auth();
    this.provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();
  }

  logIn = () => this.auth.signInWithPopup(this.provider);
}

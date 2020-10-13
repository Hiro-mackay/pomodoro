import firebase from "firebase";

export interface FirebaseAuthProvider {
  logIn: () => Promise<firebase.auth.UserCredential>;
  logOut: () => Promise<void>;
  onAuthState: () => Promise<firebase.User>;
}

export interface FirebaseAuthSnsProvider {
  logIn: () => Promise<firebase.auth.UserCredential>;
}

export type PROVIDER_TYPE = "facebook" | "google";

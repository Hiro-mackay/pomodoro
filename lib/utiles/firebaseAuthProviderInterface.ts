import { User } from "@/userCtx";
import firebase from "firebase";
import { UserAuthenticationInfo } from "@/authentication";

export interface FirebaseAuthProvider {
  logIn: (provider: PROVIDER_TYPE) => Promise<firebase.auth.UserCredential>;
  logOut: () => Promise<void>;
  onAuthState: () => Promise<UserAuthenticationInfo | void>;
  getUserAuthenData: (
    user: firebase.User | null
  ) => Promise<UserAuthenticationInfo | void>;
  toUserEntity: (user: firebase.User | null) => User | null;
}

export interface FirebaseAuthSnsProvider {
  logIn: () => Promise<firebase.auth.UserCredential>;
}

export type PROVIDER_TYPE = "facebook" | "google";

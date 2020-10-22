import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

import * as fetch from "isomorphic-fetch";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const httpLink = createHttpLink({
  uri: functions.config().hasura.url,
  fetch,
});

const authLink = setContext((request, previousContext) => ({
  headers: { "x-hasura-admin-secret": functions.config().hasura.admin_secret },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// On sign up.
exports.hookSignUp = functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate(async (user) => {
    const customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": user.uid,
      },
    };

    try {
      await admin.auth().setCustomUserClaims(user.uid, customClaims);

      await client.mutate({
        variables: {
          id: user.uid,
          name: user.displayName || "unknown",
          email: user.email || "unknown",
        },
        mutation: gql`
          mutation InsertUser($id: String!, $name: String!, $email: String!) {
            insert_user_one(object: { id: $id, name: $name, email: $email }) {
              id
              name
              email
            }
          }
        `,
      });

      await db
        .collection("users")
        .doc(user.uid)
        .set({ refreshTime: admin.firestore.FieldValue.serverTimestamp() });

      functions.logger.log("success update user data", user.uid);
    } catch (error) {
      functions.logger.error(error);
    }
  });

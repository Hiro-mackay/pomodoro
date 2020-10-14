import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

let accessToken = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`${process.env.APP_HOST}/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.asseccToken;
  } else {
    accessToken = "public";
  }
};

const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.message
  ) {
    accessToken = null;
  }
});

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: "https://vast-viper-60.hasura.app/v1/graphql",
    credentials: "include",
    headers,
    fetch,
  });
  return httpLink;
};
const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient("wss://vast-viper-60.hasura.app/v1/graphql", {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken();
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      },
    })
  );
};

export default function creaeApolloClien(initialState, headers) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers);
  } else {
    link = createWSLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}

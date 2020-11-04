import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

let accessToken = null;

const hasuraEndPointHttp = process.env.NEXT_PUBLIC_HASURA_END_POINT_HTTP;
const hasuraEndPointWss = process.env.NEXT_PUBLIC_HASURA_END_POINT_WSS;

console.log("hasuraEndPointHttp", hasuraEndPointHttp);
console.log("hasuraEndPointWss", hasuraEndPointWss);

const requestAccessToken = async () => {
  if (accessToken) return;
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = "public";
  }
};

const resetTokenLink = onError(({ networkError }) => {
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
    uri: hasuraEndPointHttp,
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(hasuraEndPointWss, {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      },
    })
  );
};

export const createApolloClient = (initialState, headers) => {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers); // executed on server
  } else {
    link = createWSLink(); // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
};

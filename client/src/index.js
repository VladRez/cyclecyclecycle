import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./components/App";
import ApolloClient from "apollo-client";

import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
// eslint-disable-next-line
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";

import Mutations from "./graphql/mutations";
import Queries from "./graphql/queries";
const { VERIFY_USER } = Mutations;


let uri;
if (process.env.NODE_ENV === "production") {
  uri = `/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

// pass token within header

const httpLink = createHttpLink({
  uri,
  headers: {
    authorization: localStorage.getItem("auth-token") || ""
  }
});

// verify login
const token = localStorage.getItem("auth-token");

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// eslint-disable-next-line
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
} else {
  cache.writeData({
    data: {
      isLoggedIn: false
    }
  });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

//for debugging purposes only
// window.httpLink = httpLink;
// window.token = token;
// window.cache = cache;
// window.client = client;

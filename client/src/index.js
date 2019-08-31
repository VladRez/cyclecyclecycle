import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import Mutations from "./graphql/mutations"

console.log(`client running in ${process.env}`)

const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
    headers: {
        authorization: localStorage.getItem("auth-token") 
    }
});


ReactDOM.render(<App />, document.getElementById('root'));

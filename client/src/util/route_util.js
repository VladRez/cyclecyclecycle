import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Protected = ({ component: Component, path, exact, ...rest }) => (
  <Query query={IS_LOGGED_IN}>
    {({ data }) => {
      
      return (
        <Route
          {...rest}
          render={props =>
            data.isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      );
    }}
  </Query>
);

const Auth = ({ component: Component, path, exact, ...rest }) => (
  <Query query={IS_LOGGED_IN}>
    {({ data }) => {
      
      return (
        <Route
          path={path}
          exact={exact}
          render={props =>
            !data.isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
      );
    }}
  </Query>
);

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);

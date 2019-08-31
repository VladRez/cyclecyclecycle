import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { Query } from "react-apollo";

const { IS_LOGGED_IN } = require("../graphql/queries");

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
              <Redirect to="/login" />
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

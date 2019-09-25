import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";

const { IS_LOGGED_IN } = Queries;

const Logout = props => (
  <ApolloConsumer>
    {client => (
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {
          if (data.isLoggedIn) {
            return (
              <a
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("currentUserId");
                  client.writeData({ data: { isLoggedIn: false } });
                  // props.history.push("/login");
                }}
              >
                Logout
              </a>
            );
          } else {
            return null;
          }
        }}
      </Query>
    )}
  </ApolloConsumer>
);
export default Logout;

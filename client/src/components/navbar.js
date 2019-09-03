import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./session/logout";
import { ApolloConsumer } from "react-apollo";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import "./navbar.css";

const { IS_LOGGED_IN } = Queries;

export default class Navbar extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                // console.log(data)
                // console.log(client)
                return (
                  <div className="navbar-container">
                    <div className="navbar">
                      <Link to="/" className="navbar__logo">
                        CycleCycleCycle
                      </Link>
                      <div className="nav-group">
                        <div className="dropdown">
                          <div className="nav-item nav-profile dropbtn">
                            UserIcon
                          </div>
                          <div className="dropdown-content">
                            <Logout />
                          </div>
                        </div>
                        <div className="dropdown">
                          <div className="nav-item nav-profile dropbtn">
                            PlusIcon
                          </div>
                          <div className="dropdown-content">
                            <Link to="/routes/new">Create a route</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="navbar-container">
                    <div className="navbar">
                      <Link to="/" className="navbar__logo">
                        CycleCycleCycle
                      </Link>
                      <div className="flex-row">
                        <Link
                          to="/signup"
                          className="button button-primary margin-right-s"
                        >
                          Sign Up
                        </Link>
                        <Link to="/login" className="button button-secondary">
                          Log In
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

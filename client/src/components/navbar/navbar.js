import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../session/logout";
import { ApolloConsumer } from "react-apollo";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./navbar.css";

const { IS_LOGGED_IN } = Queries;

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: null
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu = menuType => event => {
    event.preventDefault();

    this.setState({ showMenu: menuType }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu() {
    this.setState({ showMenu: null }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  render() {
    return (
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {
          if (data.isLoggedIn) {
            return (
              <div className="navbar-container">
                <div className="navbar">
                  <Link to="/" className="navbar__logo">
                    CycleCycleCycle
                  </Link>
                  <div className="nav-group">
                    <div className="dropdown">
                      <div
                        className="nav-item nav-profile dropbtn"
                        onClick={this.showMenu("userOptions")}
                      >
                        <i className="fas fa-user font-size-l"></i>
                      </div>
                      {this.state.showMenu === "userOptions" ? (
                        <div
                          className="dropdown-content"
                          ref={element => {
                            this.dropdownMenu = element;
                          }}
                        >
                          <Link to="/routes/" onClick={this.closeMenu}>
                            My Routes
                          </Link>
                          <Logout />
                          
                        </div>
                      ) : null}
                    </div>
                    <div className="dropdown">
                      <div
                        className="nav-item nav-profile dropbtn"
                        onClick={this.showMenu("options")}
                      >
                        <i className="fas fa-plus font-size-l"></i>
                      </div>
                      {this.state.showMenu === "options" ? (
                        <div
                          className="dropdown-content"
                          ref={element => {
                            this.dropdownMenu = element;
                          }}
                        >
                          <Link to="/routes/new">Create a route</Link>
                          <Link to="/activity/new" onClick={this.closeMenu}>
                            Add manual entry
                          </Link>
                        </div>
                      ) : null}
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
    );
  }
}

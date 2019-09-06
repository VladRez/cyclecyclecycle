import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";
import Demo from "./demo";
import "./session.css";

const { LOGIN_USER } = Mutations;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, _id } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("currentUserId", _id);
          this.props.history.push("/dashboard");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {LoginUser => (
          <div className="login-page-background">
            <div className="session-form-container">
              <form
                className="flex-column"
                onSubmit={e => {
                  e.preventDefault();

                  LoginUser({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <h1 className="session-form-heading">Log In</h1>

                <input
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  className="session-form-input"
                />
                <input
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                  className="session-form-input"
                />
                <button
                  className="session-form-button-primary button"
                  type="submit"
                >
                  Log In
                </button>
                <Demo />
              </form>
              {/* <span className="margin-right-s">Don't have an account?</span>
              <Link to="/signup">Sign Up</Link> */}
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;

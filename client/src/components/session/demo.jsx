import "./session.css";
import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "aswitland2@guardian.co.uk",
      password: "K7fCTQmSo"
    };
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
        update={(client, { data }) => {
          client.writeData({
            data: { isLoggedIn: data.login.loggedIn }
          });
        }}
      >
        {LoginUser => (
          <div>
            <form
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
              <button
                className="session-form-button-secondary button"
                type="submit"
              >
                Demo Login
              </button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Demo);

import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { REGISTER_USER } = Mutations;

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/dashboard");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {register => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                register({
                  variables: {
                    fname: this.state.fname,
                    lname: this.state.lname,
                    email: this.state.email,
                    password: this.state.password,
                    password2: this.state.password2
                  }
                });
              }}
            >
              <input
                value={this.state.fname}
                onChange={this.update("fname")}
                placeholder="First Name"
              />
              <input
                value={this.state.lname}
                onChange={this.update("lname")}
                placeholder="Last Name"
              />
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <input
                value={this.state.password2}
                onChange={this.update("password2")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;

import { AuthRoute, ProtectedRoute } from "../util/route_util";
// eslint-disable-next-line
import { HashRouter, Switch, Route } from "react-router-dom";
import React from "react";

// Auth Components
import Login from "./session/login";
import Signup from "./session/signup";

// Protected Components
import Session from "./session/session";
import Dashboard from "./dashboard/dashboard"


function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <AuthRoute exact path="/" component={Session} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

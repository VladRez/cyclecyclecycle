import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { HashRouter, Switch, Route } from "react-router-dom";
import React from "react";

// Auth Components
import Login from "./session/login";
import Signup from "./session/signup";

// Protected Components
import Session from "./session/session";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={Session} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

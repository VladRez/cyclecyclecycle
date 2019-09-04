import "./App.css";
import "../index.css";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
// eslint-disable-next-line
import { HashRouter, Switch, Route } from "react-router-dom";
import React from "react";

// Auth Components
import Login from "./session/login";
import Signup from "./session/signup";

// Protected Components
import Session from "./session/session";
import Dashboard from "./dashboard/dashboard";
import Activity from "./activity/Activity";

// Routes
import NewRoute from "./new_route";
import Navbar from "./navbar";
import ActivityShow from "./activity_show/activity_show";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Switch>
          <AuthRoute exact path="/" component={Signup} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute
            exact
            path="/activities/:activityId"
            component={ActivityShow}
          />
          <ProtectedRoute exact path="/routes/new" component={NewRoute} />
          <Route exact path="/activity/new" component={Activity} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

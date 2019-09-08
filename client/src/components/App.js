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
import Navbar from "./navbar/navbar";
import ActivityShow from "./activity_show/activity_show";

import RouteMapCreator from "./route/route_map";
import RouteDisplay from "./route/route_display";
import RouteIndex from "./route/route_index"
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
          <Route exact path="/activity/new" component={Activity} />
          <ProtectedRoute
            exact
            path="/routes/new"
            component={RouteMapCreator}
          />
          <ProtectedRoute exact path="/routes/:id" component={RouteDisplay} />
          <ProtectedRoute exact path="/routes/" component={RouteIndex} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

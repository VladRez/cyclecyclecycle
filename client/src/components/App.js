import "./App.css";
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

// Routes
import NewRoute from "./new_route";
import Navbar from "./navbar";
// import Map from "./map/index"
// import Async from "./map/Map"
import RouteMap from "./route/route_map"

function App() {
  return (
    <div>
      <HashRouter>
      <Navbar />
        <Switch>
          <AuthRoute exact path="/" component={Session} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
          <ProtectedRoute exact path="/routes/new" component={NewRoute} />
          <Route exact path="/map" component={RouteMap}/>
          {/* <Route exact path="/amap" component={Async}/> */}
         
        </Switch>
          
      </HashRouter>
    </div>
  );
}

export default App;

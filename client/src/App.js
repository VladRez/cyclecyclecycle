import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import "./App.css";
import NewRoute from "./components/new_route";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/routes/new" component={NewRoute} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

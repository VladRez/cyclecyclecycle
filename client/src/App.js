import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import "./App.css";
import NewRoute from "./components/new_route";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/routes/new" component={NewRoute} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

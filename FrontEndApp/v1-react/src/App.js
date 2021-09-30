import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import LoginIndex from "./Components/Login/LoginIndex";
import React from "react";
function App() {
  return (
    <div className="App">
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" component={LoginIndex} />
          </Switch>
          <Redirect to="/" />
        </HashRouter>
      </div>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter,
  Redirect,
  HashRouter,
} from "react-router-dom";
import LoginIndex from "./Components/Login/LoginIndex";
import React, { useEffect, useState } from "react";
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

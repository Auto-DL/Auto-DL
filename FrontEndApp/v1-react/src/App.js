import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import LoginIndex from "./Components/Login/LoginIndex";
import React, { useEffect, useState } from "react";
function App() {
  return (
    <div className="App">
      <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LoginIndex} />
        </Switch>
        <Redirect to="/" />
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import Homeindex from "../MainApp/Homeindex";
import Layout from "../MainApp/Layout";
import step2 from "../MainApp/Step2";
import step3 from "../MainApp/Step3";

function LoginIndex() {
  return (
    <>
    <BrowserRouter>
        <Layout/>
        <Switch>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/home"  component={Homeindex} />
          <Route path="/step-2" component={step2} />
          <Route path="/step-3" component={step3} />
        </Switch>

        <Redirect to="/login" />
      </BrowserRouter>
    </>
  );
}

export default LoginIndex;

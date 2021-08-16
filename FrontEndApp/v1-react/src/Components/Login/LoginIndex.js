import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import LoginForm from "./LoginForm";
import Homeindex from "../MainApp/Homeindex";
import Deployment from "../Deployment/DeploymentIndex";
import Layout from "../MainApp/Layout";
import step2 from "../MainApp/Step2";

function LoginIndex() {
  return (
    <>
      <BrowserRouter>
        <Layout />
        <Switch>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/home" component={Homeindex} />
          <Route path="/deploy" component={Deployment} />
          <Route path="/step-2" component={step2} />
        </Switch>

        <Redirect to="/login" />
      </BrowserRouter>
    </>
  );
}

export default LoginIndex;

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import LoginForm from "./LoginForm";
import Homeindex from "../MainApp/Homeindex";
import Layout from "../MainApp/Layout";
import step2 from "../MainApp/Step2";
import AuthorizeGitHub from "../MainApp/step-2/Authorize"
import GitHubResponse from "../MainApp/step-2/GitHubResponse";

function LoginIndex() {
  return (
    <>
      <BrowserRouter>
        <Layout />
        <Switch>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/home" component={Homeindex} />
          <Route path="/step-2" component={step2} />
          <Route path="/authorize/github" component={AuthorizeGitHub} />
          <Route path="/github/publish" component={GitHubResponse} />

        </Switch>
        <Redirect to="/login" />

      </BrowserRouter>
    </>
  );
}

export default LoginIndex;

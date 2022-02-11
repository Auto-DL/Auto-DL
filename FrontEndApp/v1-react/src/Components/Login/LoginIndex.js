import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { useRef } from "react";
import LoginForm from "./LoginForm";
import Homeindex from "../MainApp/Homeindex";
import ProfileIndex from "../ProfilePage/ProfileIndex";
import Deployment from "../Deployment/DeploymentIndex";
import Layout from "../MainApp/Layout";
import Step2 from "../MainApp/Step2";
import AuthorizeGitHub from "../MainApp/step-2/AuthorizeGithub.js";
import GitHubResponse from "../MainApp/step-2/GitHubResponse";

function LoginIndex() {
  
  const step2Ref = useRef();

  return (
    <>
      <BrowserRouter>
        <Layout step2Ref={step2Ref} />
        <Switch>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/home" component={Homeindex} />
          <Route path="/profile" component={ProfileIndex} />
          <Route path="/deploy" component={Deployment} />
          <Route path="/step-2" render={(props) => <Step2  ref={step2Ref} {...props} />}/>
          <Route path="/github/authorize" component={AuthorizeGitHub} />
          <Route path="/github/status/" component={GitHubResponse} />
          <Redirect to="/login" />
        </Switch>

      </BrowserRouter>
    </>
  );
}

export default LoginIndex;

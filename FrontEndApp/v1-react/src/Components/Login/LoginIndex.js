import { BrowserRouter,Route, Switch, Redirect  } from 'react-router-dom';
import React from "react";
import LoginForm from './LoginForm';
import Home from '../MainApp/Homeindex';
import step1 from '../MainApp/Step1';
import step2 from '../MainApp/Step2';
import step3 from '../MainApp/Step3';

function LoginIndex() {

  return (
    <>
  

    <BrowserRouter>
        <Switch>

          <Route path='/login' exact component={LoginForm} />
          <Route path='/home' exact component={Home} />
          <Route path='/step-1'  component={step1} />
          <Route path='/step-2'  component={step2} />
          <Route path='/step-3'  component={step3} />
        
        </Switch>

        <Redirect to="/login"/>

    </BrowserRouter>
    </>
  );
}

export default LoginIndex;

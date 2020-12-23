import { BrowserRouter,Link,Route, Switch, withRouter,Redirect  } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import LoginForm from './LoginForm';
import Home from '../MainApp/Homeindex';


function LoginIndex() {

   
  const [isLoggedin, setisLoggedin] = useState(false);
  const loggedin = localStorage.getItem('isLoggedin');
  console.log(loggedin);
//   if (loggedin === '1'){
//     setisLoggedin(true);
//   };
  

  return (
    <>
    {/* <h1>index</h1> */}

    <BrowserRouter>
        <Switch>

          {/* <Route path='/' exact component={LoginIndex} /> */}
          <Route path='/login' exact component={LoginForm} />
          <Route path='/home' exact component={Home} />
        
        </Switch>
    {
        loggedin === 'true' ?
        <Redirect to="/home"/>
        :
        <Redirect to="/login"/>
    }

    </BrowserRouter>
    </>
  );
}

export default LoginIndex;
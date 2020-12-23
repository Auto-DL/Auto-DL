import { BrowserRouter,Link,Route, Switch, withRouter,Redirect  } from 'react-router-dom';
import LoginForm from './Components/Login/LoginForm';
import LoginIndex from './Components/Login/LoginIndex';
// import Home from './Components/MainApp/Homeindex';
import React, { useEffect, useState } from "react";

function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <Switch>

          <Route path='/' exact component={LoginIndex} />
          {/* <Route path='/login' exact component={LoginForm} /> */}
          {/* <Route path='/home' exact component={Home} /> */}
        
        </Switch>

        <Redirect to="/"/>

     
      </BrowserRouter>

    </div>
  );
}

export default App;

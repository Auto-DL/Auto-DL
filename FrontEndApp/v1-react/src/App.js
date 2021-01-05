import { BrowserRouter,Route, Switch, Redirect  } from 'react-router-dom';
import LoginIndex from './Components/Login/LoginIndex';
import React from "react";

function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <Switch>

          <Route path='/'  component={LoginIndex} />
          {/* <Route path='/login' exact component={LoginForm} /> */}
          {/* <Route path='/home' exact component={Home} /> */}
        
        </Switch>

        <Redirect to="/"/>

     
      </BrowserRouter>

    </div>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter,
  Switch,
  useLocation,
  IndexRoute,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory 
} from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';


function Home() {

  const history = useHistory();

  const Logout = () => {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <>

    home
    <br/>
    <p onClick={Logout}>Logout</p>

    <br/>

    <div  onClick={ ()=>history.push("/step-1") }>
    <AddCircleIcon/>
    <b>New</b>
    </div>

    </>
  );
}

export default Home;

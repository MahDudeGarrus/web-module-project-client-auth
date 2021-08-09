import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import Friends from './components/Friends';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const logout = () => {
    axiosWithAuth()
    .post("logout", {
  })
    .then(response => {
      localStorage.removeItem("token");
      console.log(window.location)
      window.location.href = '/login';
    })
    .catch(error => {
      console.log("Error logging out: ", error)
    })
  }
  return (
    <Router>
      <div className="App">
        <div>
          <nav className="friends-navbar">
            <h1>Friends</h1>
            <Link to="/login">Log In</Link>
            <Link onClick={logout}>Log Out</Link>
            <Link to="protected">Protected Page</Link>
          </nav>
        </div>

        <Switch>
          <PrivateRoute exact path='/protected' component={Friends} />
          <Route path='/login' component={Login} />
          <Route component={Login} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;

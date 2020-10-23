import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from './compenents/LandingPage'
import LoginPage from './compenents/Sign/LoginPage'
// import Navbar from './compenents/common/Navbar'
import RegisterPage from './compenents/Sign/RegisterPage'

function App() {
  return (
    <>
      <Router>
        <div className="container">
        {/* <Navbar /> */}
        <br/>
         <Route path="/" exact component={LandingPage} />
        { /*<Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/users" component={CreateUser} />
        <Route path="/reports" component={CreateUser} />
        <Route path="/login" component={CreateUser} /> */ }
        {/* <Route path="/dashboard" component={} /> */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        </div>
    </Router>
    </>
  );
}

export default App;

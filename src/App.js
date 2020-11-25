import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './compenents/landingPage/LandingPage'
import LoginPage from './compenents/Sign/LoginPage'
// import Navbar from './compenents/common/Navbar'
// import RegisterPage from './compenents/Sign/RegisterPage'
import Register from './compenents/Sign/Multi-Step-Registration/UserForm'
import AdminDashboard from './compenents/AdminDashboard'
import useLocalStorage from './hooks/useLocalStorage';
import MessageComp from './compenents/Message/MessageComp'
import ErrorPage from './compenents/ErrorPage.js'
import MapPage from './compenents/MapPage'
import RequestForm from './compenents/CRUDs/Requests/RequestCreate'

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
        <Route path="/reports" component={CreateUser} /> */ }
        <Route path="/admin-dashboard" exact component={AdminDashboard} /> 
        <Route path="/message" exact component={MessageComp}/>
        <Route path="/register" exact component={Register} />
        <Route path="/reports/create" component={RequestForm}/>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/error" component={ErrorPage} />
        </div>
      </Router>
    </>
  );
}

export default App;

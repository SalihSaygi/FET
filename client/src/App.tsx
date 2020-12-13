import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from './compenents/LandingComponents/LandingPage'
// import Navbar from './compenents/common/Navbar'
// import RegisterPage from './compenents/Sign/RegisterPage'
import Register from './compenents/Sign/Multi-Step-Registration/UserForm'
import AdminDashboard from './compenents/AdminDashboard'
// import useLocalStorage from './hooks/useLocalStorage';
import MessageComp from './compenents/Message/MessageComp'
import MapPage from './compenents/MapPage'
import RequestForm from './compenents/CRUDs/Requests/RequestCreate'
import {ContentPage} from './compenents/ContentPage'
import ErrorPage from './compenents/ErrorPage'

const App: React.FC = () => {

  return (
      <Router>
        <div>
          <Switch>
        {/* <Navbar /> */}
        {/* <br/>  */}
         <Route path="/" exact component={LandingPage} />
        { /*<Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/users" component={CreateUser} />
        <Route path="/reports" component={CreateUser} /> */ }
        <Route path="/admin-dashboard" exact component={AdminDashboard} /> 
        <Route path="/message" exact component={MessageComp}/>
        <Route path="/register" exact component={Register} />
        <Route path="/reports/create" exact component={RequestForm}/>
        {/* <Route path="/login" exact component={LoginPage} /> */}
        <Route path="/map" exact component={MapPage} />
        <Route path="/dashboard" exact compenent={ContentPage}/>
        <Route path="/error" exact component={ErrorPage} />
          </Switch>
        </div>
      </Router>
  )
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './compenents/landingPage/LandingPage'
import LoginPage from './compenents/Sign/LoginPage'
// import Navbar from './compenents/common/Navbar'
// import RegisterPage from './compenents/Sign/RegisterPage'
import { Register } from './compenents/Sign/Multi-Step-Registration/UserForm'
import AdminDashboard from './compenents/AdminDashboard'
import useLocalStorage from './hooks/useLocalStorage';
import MessagingPage from './compenents/Message/MessagingPage'
import {ContactsProvider} from './contexts/ContactProvider'
import {ConversationsProvider} from './contexts/ConversationProvider';
import {SocketIOProvider} from './contexts/SocketIOProvider';
import ErrorPage from './compenents/ErrorPage.js'
import MapPage from './compenents/MapPage'

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
        <Route path="/admin-dashboard" component={AdminDashboard} /> 
        <Route path="/message">
          <SocketIOProvider>
            <ContactsProvider>
              <ConversationsProvider>
                <MessagingPage/>
              </ConversationsProvider>
            </ContactsProvider>
          </SocketIOProvider>
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/login" component={LoginPage} />
        <Route path="/map" component={MapPage} />
        <Route path="*" component={ErrorPage} />
        </div>
      </Router>
    </>
  );
}

export default App;

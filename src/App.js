import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './compenents/landingPage/LandingPage'
import LoginPage from './compenents/Sign/LoginPage'
// import Navbar from './compenents/common/Navbar'
import RegisterPage from './compenents/Sign/RegisterPage'
import AdminDashboard from './compenents/AdminDashboard'
import useLocalStorage from './hooks/useLocalStorage';
import MessagingPage from './compenents/Message/MessagingPage'
import {ContactsProvider} from './contexts/ContactProvider'
import {ConversationsProvider} from './contexts/ConversationProvider';
import {SocketIOProvider} from './contexts/SocketIOProvider';

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
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    </>
  );
}

export default App;

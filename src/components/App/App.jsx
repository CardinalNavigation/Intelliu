import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Dashboard from '../Dashboard/Dashboard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import NewItem from '../NewItem/NewItem';
import NewItemConfirmation from '../NewItemConfirmation/NewItemConfirmation';
import FAQs from '../FAQs/FAQs';
import AdminStandards from '../AdminStandards/AdminStandards';
import SendGrid from "../SendGrid/SendGrid"


import './App.css';

//this imports the tailwind css classes to all files
import "../../input.css";


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // console.log(user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className='appContainer flex-row justify-items-end'>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/dashboard" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows Dashboard else shows LoginPage
            exact
            path="/dashboard"
          >
            {
              //Redirect Admin to home. 
            }
            {user.role === "intelliu" ? <Redirect to="/adminstandards" /> : <Dashboard />}
          </ProtectedRoute>

          <Route

            exact
            path="/sendgrid"
          >
            <SendGrid />
          </Route>

          <ProtectedRoute
            exact
            path="/adminstandards"
            
          >
            {user.role !=="intelliu" ? <Redirect to="/dashboard" /> : <AdminStandards />}
          </ProtectedRoute>

          <ProtectedRoute

            exact
            path="/loadingscreen"
          >
            <LoadingScreen />
          </ProtectedRoute>

          <ProtectedRoute

            exact
            path="/newitem"
          >
            <NewItem />
          </ProtectedRoute>

          <ProtectedRoute

            exact
            path="/newitemconfirmation"
          >
            <NewItemConfirmation />
          </ProtectedRoute>

          <ProtectedRoute

            exact
            path="/faq"
          >
            <FAQs />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>


          <ProtectedRoute
            exact
            path="/registration"
          >
            {user.role !== "intelliu" ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the login page
              <RegisterPage />
            }
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

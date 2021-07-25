import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Route, Switch} from 'react-router-dom'

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotsDisplay from './components/SpotDisplay';
import SpotDetail from './components/SpotDetail';
import CreateSpotForm from './components/CreateSpotForm';
import Trips from './components/Trips';

import Navigation from './components/Navigation'
import * as sessionActions from "./store/session"

import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  console.log(sessionUser)
  return (
    <>
    <Navigation isLoaded={isLoaded}/>
    {isLoaded && (

      <Switch>
      <Route exact path='/'>
        {!sessionUser && (
          <div className="home-page-forms">
            <LoginFormPage />
            <SignupFormPage />
          </div>
        )}
        {sessionUser && (
          <h2>
            <Trips />
          </h2>
        )}
      </Route>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
      <Route path='/spots/new'>
        <CreateSpotForm />
      </Route>
      <Route path='/spots/:id'>
        <SpotDetail />
      </Route>
      <Route path='/spots'>
        <SpotsDisplay />
      </Route>
      <Route path='/'>
        <div className='page-not-found'>
          Page Not Found.
        </div>
      </Route>
    </Switch>
      )}
    </>
  );
}

export default App;

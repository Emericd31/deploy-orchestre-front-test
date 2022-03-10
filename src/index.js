import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from "jwt-decode";
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/User/LoginPage';
import NewProfilePage from './pages/User/NewProfilePage';
import ProfileCompletedPage from './pages/User/ProfileCompleted';
import BoardPage from './pages/Board/BoardPage';
import MyAccountPage from './pages/User/MyAccountPage';
import EventPage from './pages/Event/EventPage';
import EventPageGestion from './pages/Event/EventPageGestion';
import AddEventPage from './pages/Event/AddEventPage';
import EventDetailsPageGestion from './pages/Board/BoardPage';

import NotFoundPage from './pages/General/NotFoundPage';
import MainRouter from './Router';

function isAuthenticated() {
  let token = localStorage.getItem('Token');
  if (token !== null) {
    let decodedToken = jwt_decode(token);
    let tokenExpTimestamp = decodedToken.exp;
    let nowTimestamp = Math.round((new Date()).getTime() / 1000);
    return (nowTimestamp < tokenExpTimestamp)
  }
  return false;
}

function hasInitialized() {
  let token = localStorage.getItem('Token');
  if (token !== null) {
    let decodedToken = jwt_decode(token);
    if (decodedToken.initializedProfile === "True") {
      return true;
    } else {
      return false;
    }
  }
}

function rightIsInRole(myRights, rightName) {
  for (let i = 0; i < myRights.length; ++i) {
    if (myRights[i].right.name === rightName) {
      return true;
    }
  }
  return false;
};

function AuthRoute(props) {
  // Not signed in 
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />
  }

  // Profile no initialized
  if (!hasInitialized()) {
    return <Navigate to="/newProfile" />
  }

  return props.children;
}

function RedirectToHome({ children }) {
  // Signed in
  if (isAuthenticated()) {
    return <Navigate to="/" />
  }

  // Not signed in 
  return children
}

function NewProfileRoute(props) {
  // Profile already initialized
  if (hasInitialized()) {
    return <Navigate to="/" />
  }

  // Signed in and profile no initialized
  return props.children
}

function AuthEventGestion(props) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />
  }
  if (!rightIsInRole(props.myRights, "manage_events")) {
    return <Navigate to="/events" />
  }
  return props.children;
}

let rootElement = document.getElementById('root');
ReactDOM.render(
  <MainRouter>
  </MainRouter>,
  rootElement
);

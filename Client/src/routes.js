import React from 'react';
import { Router, Route } from 'react-router';

import App from './Components/app';
import ActivityTable from './Components/ActivityTable/activityTable';
import ErrorPage from './Components/ErrorPage/errorPage'
import Statistics from './Components/Statistics/statistics'
import ThoughtsTemplate from './Components/ThoughtList/thoughtsTemplate';
import Login from './Components/Login/login';
import Register from './Components/Login/register';


function requireAuth(nextState, replaceState) {
  const isLoggedIn = localStorage.getItem("loggedin")
  if(!isLoggedIn) {
    replaceState({
      pathname: '/login'
    });
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} onEnter={requireAuth} />
    <Route path="/activityTable" component={ActivityTable} onEnter={requireAuth} />
    <Route path="/thoughtsTemplate" component={ThoughtsTemplate} onEnter={requireAuth} />
    <Route path="/statistics" component={Statistics} onEnter={requireAuth} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="*" component={ErrorPage} />
  </Router>
);

export default Routes;

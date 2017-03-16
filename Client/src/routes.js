import React from 'react';
import { Router, Route } from 'react-router';

import App from './Components/App';
import ActivityTable from './Components/ActivityTable';
import ScheduleTable from './Components/ScheduleTable';
import ErrorPage from './Components/ErrorPage'
import Statistics from './Components/Statistics'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/activityTable" component={ActivityTable} />
    <Route path="/scheduleTable" component={ScheduleTable} />
    <Route path="/statistics" component={Statistics} />
    <Route path="*" component={ErrorPage} />
  </Router>
);

export default Routes;

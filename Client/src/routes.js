import React from 'react';
import { Router, Route } from 'react-router';

import App from './Components/App';
import ActivityTable from './Components/ActivityTable';
import ScheduleTable from './Components/ScheduleTable';
import ErrorPage from './Components/ErrorPage'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/activityTable" component={ActivityTable} />
    <Route path="/scheduleTable" component={ScheduleTable} />
    <Route path="*" component={ErrorPage} />
  </Router>
);

export default Routes;

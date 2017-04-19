import React from 'react';
import { Router, Route } from 'react-router';

import App from './Components/app';
import ActivityTable from './Components/activityTable';
import ScheduleTable from './Components/scheduleTable';
import ErrorPage from './Components/errorPage'
import Statistics from './Components/statistics'
import ThoughtsTemplate from './Components/thoughtsTemplate';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/activityTable" component={ActivityTable} />
    <Route path="/scheduleTable" component={ScheduleTable} />
    <Route path="/thoughtsTemplate" component={ThoughtsTemplate} />
    <Route path="/statistics" component={Statistics} />
    <Route path="*" component={ErrorPage} />
  </Router>
);

export default Routes;

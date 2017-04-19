import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/app';
import { browserHistory } from 'react-router';
import Routes from './routes';
import './index.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import DashboardPage from './dashboard';
import ErrorPage from './error/index.js';
import TestSuites from './test-suites';
import TestRuns from './test-runs';
import TestCases from './test-cases';
import TestSteps from './test-steps';

import store from './store';

const container = document.getElementById('container');

function getBootstrap() {
  return fetch('/api/v1/bootstrap')
    .then(response => response.json());
}

function renderApplication(bootstrap) {
  document.title = bootstrap.projectName;
  window.bootstrap = bootstrap;

  render(
    <Router history={browserHistory}>
      <Route path="/" component={DashboardPage}/>
      <Route path="/test-runs" component={TestRuns}/>
      <Route path="/test-suites" component={TestSuites}/>
      <Route path="/test-runs/:testRunId/test-cases" component={TestCases}/>
      <Route path="/test-runs/:testRunId/test-steps/*" component={TestSteps}/>
      <Route path="*" component={ErrorPage}/>
    </Router>, container
  );
}

getBootstrap()
  .then(renderApplication);

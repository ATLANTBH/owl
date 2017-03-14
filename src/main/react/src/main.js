

/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import ErrorPage from './error/index.js';
import TestRuns from './test-runs';
import TestCases from './test-cases';
import TestSteps from './test-steps';

import store from './store';

const container = document.getElementById('container');

render(
  <Router history={browserHistory}>
    <Route path="/" component={TestRuns}/>
    <Route path="/test-runs" component={TestRuns}/>
    <Route path="/test-runs/:testRunId/test-cases" component={TestCases}/>
    <Route path="/test-runs/:testRunId/test-steps/*" component={TestSteps}/>
    <Route path="*" component={ErrorPage}/>
  </Router>, container
);

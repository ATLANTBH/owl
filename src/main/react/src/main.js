

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

import HomePage from './home/index.js';
import ErrorPage from './error/index.js';

import store from './store';
import router from './router';
import history from './history';

const container = document.getElementById('container');

render( 
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/test" component={ErrorPage}/>
  </Router>, container
);

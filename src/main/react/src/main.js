import 'babel-polyfill';
import 'whatwg-fetch';
import '!style-loader!css-loader!react-select/dist/react-select.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import LoginContainer from 'containers/Login/LoginContainer';
import ErrorContainer from 'containers/Error/ErrorContainer';
import TestSuitesContainer from 'containers/TestSuites/TestSuitesContainer';
import TestRunsContainer from 'containers/TestRuns/TestRunsContainer';
import TestCasesContainer from 'containers/TestCases/TestCasesContainer';
import TestStepsContainer from 'containers/TestSteps/TestStepsContainer';
import { getBootstrap } from 'api';

getBootstrap()
  .then(bootstrap => {
    document.title = bootstrap.projectName;
    window.bootstrap = bootstrap;

    render(
      <Router history={browserHistory}>
        <Route path="/" component={LoginContainer} />
        <Route path="/test-runs" component={TestRunsContainer} />
        <Route path="/test-suites" component={TestSuitesContainer} />
        <Route path="/test-runs/:testRunId/test-cases" component={TestCasesContainer} />
        <Route path="/test-runs/:testRunId/test-steps/*" component={TestStepsContainer} />
        <Route path="*" component={ErrorContainer} />
      </Router>,
      document.getElementById('container')
    );
  });

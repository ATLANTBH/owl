import $ from 'jquery';

export function getTestRun(testRunId) {
  return fetch(`/api/v1/test-runs/${testRunId}`)
    .then(fetchResponseHandler);
}

export function getTestCases(testRunId, page = 0, size = 20, sort = '') {
  return fetch(`/api/v1/test-runs/${testRunId}/test-cases?page=${page}&size=${size}&sort=${sort}`)
    .then(fetchResponseHandler);
}

export function getTestRuns(git = '', testSuite = '', page = 0, size = 10, sort = '') {
  const query = escapeQueryParams({ git, testSuite });
  return fetch(`/api/v1/test-runs?page=${page}&size=${size}&sort=${sort}&${query}`)
    .then(fetchResponseHandler);
}

export function getTestSteps(testRunId, group, page = 0, size = 10, sort = '') {
  const query = escapeQueryParams({ group });
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps?page=${page}&size=${size}&sort=${sort}&${query}`)
    .then(fetchResponseHandler);
}

export function getTestSuites(page = 0, size = 10, sort = '') {
  return fetch(`/api/v1/test-suites?page=${page}&size=${size}&sort=${sort}`)
    .then(fetchResponseHandler);
}

export function getTestSuite(id) {
  return fetch(`/api/v1/test-suites/${id}`)
    .then(fetchResponseHandler);
}

export function getFilteredTestSuites(suite, sort = '') {
  const query = escapeQueryParams({ suite });
  return fetch(`/api/v1/test-suites?sort=${sort}&${query}`)
    .then(fetchResponseHandler);
}

export function getDistinctGit(search) {
  const query = escapeQueryParams({ query: search });
  return fetch(`/api/v1/test-runs/distinct-git?${query}`)
    .then(fetchResponseHandler);
}

export function getBootstrap() {
  return fetch('/api/v1/bootstrap')
    .then(fetchResponseHandler);
}

export function saveNotes(testRunId, testStepId, notes) {
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps/${testStepId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes })
    }).then(fetchResponseHandler);
}

function fetchResponseHandler(response) {
  if (!response.ok) {
    return response.json()
      .then(response => {
        throw response;
      });
  }
  return response.json();
}

function escapeQueryParams(params) {
  return $.param(params);
}

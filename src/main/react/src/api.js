
function fetchResponseHandler(response) {
  if (!response.ok) {
    return response.json()
      .then(response => {
        throw response;
      });
  }
  return response.json();
}

export function getTestRun(testRunId) {
  return fetch(`/api/v1/test-runs/${testRunId}`)
    .then(fetchResponseHandler);
}

export function getTestCases(testRunId, page = 0, size = 10, sort = '') {
  return fetch(`/api/v1/test-runs/${testRunId}/test-cases?page=${page}&size=${size}&sort=${sort}`)
    .then(fetchResponseHandler);
}

export function getTestRuns(build = '', git = '', suite = '', page = 0, size = 10, sort = '') {
  return fetch(`/api/v1/test-runs?build=${build}&git=${git}&testSuite=${suite}&page=${page}&size=${size}&sort=${sort}`)
    .then(fetchResponseHandler);
}

export function getTestSteps(testRunId, testGroupName, page = 0, size = 10, sort = '') {
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps?group=${testGroupName}&page=${page}&size=${size}&sort=${sort}`)
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
  return fetch(`/api/v1/test-suites?suite=${suite}&sort=${sort}`)
    .then(fetchResponseHandler);
}

export function getDisinctGit(query) {
  return fetch(`/api/v1/test-runs/distinct-git?query=${query}`)
    .then(fetchResponseHandler);
}

export function getDisinctBuilds(query) {
  return fetch(`/api/v1/test-runs/distinct-builds?query=${query}`)
    .then(fetchResponseHandler);
}

export function postNotes(testRunId, testStepId, notes) {
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps/${testStepId}`, {
  method: 'put',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    notes: notes
    })
  })
    .then(fetchResponseHandler);
}

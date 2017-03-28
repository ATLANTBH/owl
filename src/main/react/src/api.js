
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

export function getTestRuns(build = '', page = 0, size = 10, sort = '') {
  return fetch(`/api/v1/test-runs?build=${build}&page=${page}&size=${size}&sort=${sort}`)
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

export function postNotes(testRunId, testStepId, notes) {
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps/${testStepId}`, {
  method: 'post',
  body: JSON.stringify({
    notes
    })
  })
    .then(fetchResponseHandler);
}
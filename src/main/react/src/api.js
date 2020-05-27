import $ from 'jquery';
import { logout } from './auth';

export function login(username, password) {
  return fetch(`/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": 1,
      "username": username,
      "password": password
    })
  })
    .then(fetchResponseHandler);
}
export function getTestRun(testRunId) {
  return fetch(`/api/v1/test-runs/${testRunId}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  }).then(fetchResponseHandler);

}
export function getTestCases(testRunId, page = 0, size = 20, sort = '') {
  return fetch(`/api/v1/test-runs/${testRunId}/test-cases?page=${page}&size=${size}&sort=${sort}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getTestRuns(git = '', testSuite = '', page = 0, size = 10, sort = '') {
  const query = escapeQueryParams({ git, testSuite });
  return fetch(`/api/v1/test-runs?page=${page}&size=${size}&sort=${sort}&${query}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getTestSteps(testRunId, group, page = 0, size = 10, sort = '') {
  const query = escapeQueryParams({ group });
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps?page=${page}&size=${size}&sort=${sort}&${query}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getTestSuites(page = 0, size = 10, sort = '') {
  return fetch(`/api/v1/test-suites?page=${page}&size=${size}&sort=${sort}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getTestSuite(id) {
  return fetch(`/api/v1/test-suites/${id}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getFilteredTestSuites(suite, sort = '') {
  const query = escapeQueryParams({ suite });
  return fetch(`/api/v1/test-suites?sort=${sort}&${query}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getDistinctGit(search) {
  const query = escapeQueryParams({ query: search });
  return fetch(`/api/v1/test-runs/distinct-git?${query}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(fetchResponseHandler);
}

export function getBootstrap() {
  return fetch('/api/v1/bootstrap')
    .then(fetchResponseHandler);
}

export function saveNotes(testRunId, testStepId, notes) {
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps/${testStepId}/notes`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ notes })
  }).then(fetchResponseHandler);
}

export function addBugReportLink(testRunId, testStepId, bugReportRequest) {
  return fetch(`/api/v1/test-runs/${testRunId}/test-steps/${testStepId}/bug-report`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bugReportRequest)
  }).then(fetchResponseHandler);
}

function fetchResponseHandler(response) {
  if (!response.ok) {
    return response.json()
      .then(response => {
        if (response.status === 401) {
          logout();
        }
        throw response;
      });
  }
  return response.json();
}

function escapeQueryParams(params) {
  return $.param(params);
}


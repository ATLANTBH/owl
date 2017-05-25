
export function linkToTestRunsByBuild(build) {
  return `/test-runs?build=${build}`;
}

export function linkToTestRunsBySuite(suite) {
  return `/test-runs?testSuite=${suite}`;
}

export function linkToTestCase(testRunId) {
  return `/test-runs/${testRunId}/test-cases`;
}

export function linkToTestSteps(testRunId, testGroupName) {
  return `/test-runs/${testRunId}/test-steps/${testGroupName}`;
}

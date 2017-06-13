
export function linkToTestRunsBySuite(suite) {
  return `/test-runs?testSuite=${suite}`;
}

export function linkToTestSteps(testRunId, testGroupName) {
  return `/test-runs/${testRunId}/test-steps/${testGroupName}`;
}

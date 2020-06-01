import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import Layout from '../../components/Layout';
import Spinner from '../../components/ui/Spinner';
import TestCasesTable from '../../components/TestCases/TestCasesTable';
import { getTestRun, getTestCases } from '../../api';
import { mergePaginatedModels } from '../../utils/model';

const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
  }
};

const EMPTY_TEST_CASES = {
  number: -1,
  last: false,
  size: 20,
  content: []
};

class TestCasesContainer extends React.Component {
  constructor() {
    super();

    this.onRequestPageData = this.onRequestPageData.bind(this);

    this.state = {
      isInitialDataLoading: true,
      isDataLoading: true,
      errorResponse: null,
      testRun: EMPTY_TEST_RUN,
      testCases: EMPTY_TEST_CASES
    }
  }

  componentDidMount() {
    this.setState({ isDataLoading: true });
    this.getPageData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getPageData(nextProps);
  }

  getPageData(props) {
    const promises = [
      this.getTestRun(props.params.testRunId),
      this.getTestCases(props, true)
    ];

    Promise.all(promises)
      .then(([testRun, testCases]) => this.setState({ isInitialDataLoading: false, testRun, testCases }))
      .catch(errorResponse => this.setState({ isInitialDataLoading: false, errorResponse }))
  }

  getTestCases(props, resetPagination = false) {
    this.setState({ isDataLoading: true });

    const page = resetPagination ? 0 : (this.state.testCases.number + 1);

    return getTestCases(props.params.testRunId,
      page,
      props.location.query.size,
      props.location.query.sort)
      .then(testCases => {
        this.setState((prev) =>
          Object.assign({}, prev, {
            isDataLoading: false,
            testCases: resetPagination ? testCases : mergePaginatedModels(prev.testCases, testCases)
          })
        );
        return testCases;
      })
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }));
  }

  getTestRun(testRunId) {
    // Cache the test run in this component
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return getTestRun(testRunId);
  }

  onRequestPageData() {
    if (!this.state.testCases.last) {
      this.getTestCases(this.props);
    }
  }

  render() {
    return (
      <Layout>
        <Spinner isShown={this.state.isInitialDataLoading} errorResponse={this.state.errorResponse} text="Fetching test cases...">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/">Dashboard</Link></li>
                <li title="Build">Test Run {this.props.params.testRunId}</li>
                <li className="active" title="Test Suite">{this.state.testRun.testSuite.suite}</li>
              </ol>
            </div>
          </div>

          <TestCasesTable testRun={this.state.testRun} testCases={this.state.testCases.content} />

          <Waypoint onEnter={this.onRequestPageData} />

          <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test cases..." />
        </Spinner>
      </Layout>
    );
  }
}

export default TestCasesContainer;

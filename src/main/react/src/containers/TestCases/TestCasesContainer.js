import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Layout from '../../components/Layout';
import Pagination from '../../components/ui/Pagination';
import Spinner from '../../components/ui/Spinner';
import TestCasesTable from '../../components/TestCases/TestCasesTable';
import {getTestRun, getTestCases} from '../../api';
import {linkToTestRunsByBuild} from '../../links';

const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
  }
};

const EMPTY_TEST_CASES = {
  content: []
};

class TestCasesContainer extends React.Component {
  constructor(){
    super();

    this.state = {
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
      getTestCases(props.params.testRunId,
                   props.location.query.page,
                   props.location.query.size,
                   props.location.query.sort)
    ];

    Promise.all(promises)
      .then(([testRun, testCases]) => this.setState({ isDataLoading: false, testRun, testCases }) )
      .catch(errorResponse         => this.setState({ isDataLoading: false, errorResponse }) )
  }

  getTestRun(testRunId) {
    // Cache the test run in this component
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return getTestRun(testRunId);
  }

  render() {
    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test cases...">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to={linkToTestRunsByBuild(this.state.testRun.build)}>{this.state.testRun.build}</Link></li>
                <li className="active">{this.state.testRun.testSuite.suite}</li>
              </ol>
            </div>
          </div>

          <TestCasesTable testRun={this.state.testRun} testCases={this.state.testCases.content} />

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testCases} />
        </Spinner>
      </Layout>
    );
  }
}

export default TestCasesContainer;

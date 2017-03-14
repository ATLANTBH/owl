import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import SuccessRate from '../../components/SuccessRate';
import TimeFormat from '../../components/TimeFormat';

const EMPTY_TEST_SUITES = {
  content: []
}

class TestSuitesPage extends React.Component {
  constructor(){
    super();

    this.state = {
      isDataLoading: true,
      testSuites: EMPTY_TEST_SUITES
    }
  }

  componentDidMount() {
    this.getPageData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getPageData(nextProps);
  }

  getPageData(props) {
    this.setState({ isDataLoading: true });

    this.getTestSuites(props.location.query.page,
      props.location.query.size)
    .then(testSuites => {
      this.setState({ isDataLoading: false, testSuites });
    });
  }

  getTestSuites(page = 0, size = 10) {
    return fetch(`/api/v1/test-suites?page=${page}&size=${size}`)
      .then(response => response.json());
  }

  render() {
    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading}>
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/test-suites">Test Suites</Link></li>
              </ol>
            </div>
          </div>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
            {notEmpty(this.state.testSuites.content,
              this.state.testSuites.content.map(testSuite =>
                <tr key={testSuite.id}>
                  <td className="focused-cell">{testSuite.suite}</td>
                  <td><TimeFormat time={testSuite.createdAt} /></td>
                </tr>
              ),
              <tr>
                <td colSpan="1" className="text-center text-muted">No test suites available.</td>
              </tr>
            )}
            </tbody>
          </table>

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testSuites} />
        </Spinner>
      </Layout>
    );
  }
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestSuitesPage;

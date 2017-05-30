import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import SuccessRate from '../../components/SuccessRate';
import TimeFormat from '../../components/TimeFormat';
import TableHeader from '../../components/TableHeader';
import { getTestSuites } from '../api';
import { linkToTestRunsBySuite } from '../links';

const EMPTY_TEST_SUITES = {
  content: []
}

class TestSuitesPage extends React.Component {
  constructor(){
    super();

    this.state = {
      isDataLoading: true,
      errorResponse: null,
      testSuites: EMPTY_TEST_SUITES
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
    getTestSuites(props.location.query.page,
                  props.location.query.size,
                  props.location.query.sort)
    .then(testSuites => this.setState({ isDataLoading: false, testSuites }) )
    .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  render() {
    function onRowClick(testSuite) {
      browserHistory.push(linkToTestRunsBySuite(testSuite.id));
    }

    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test suites">
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
                <TableHeader sortKey="suite">Name</TableHeader>
                <TableHeader sortKey="createdAt">Created</TableHeader>
              </tr>
            </thead>
            <tbody>
            {notEmpty(this.state.testSuites.content,
              this.state.testSuites.content.map(testSuite =>
                <tr className="navigateable-row" key={testSuite.id} onClick={(ev) => onRowClick(testSuite, ev)}>
                  <td className="focused-cell">{testSuite.suite}</td>
                  <td><TimeFormat time={testSuite.createdAt} /></td>
                </tr>
              ),
              <tr>
                <td colSpan="2" className="text-center text-muted">No test suites available.</td>
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

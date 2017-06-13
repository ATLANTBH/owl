import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Layout from '../../components/Layout';
import Pagination from '../../components/ui/Pagination';
import Spinner from '../../components/ui/Spinner';
import {getTestSuites} from '../../api';
import TestSuitesTable from '../../components/TestSuites/TestSuitesTable';

const EMPTY_TEST_SUITES = {
  content: []
};

class TestSuitesContainer extends React.Component {
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
      .then(testSuites     => this.setState({ isDataLoading: false, testSuites }) )
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  render() {
    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test suites...">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/test-suites">Test Suites</Link></li>
              </ol>
            </div>
          </div>

          <TestSuitesTable testSuites={this.state.testSuites.content} />

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testSuites} />
        </Spinner>
      </Layout>
    );
  }
}

export default TestSuitesContainer;

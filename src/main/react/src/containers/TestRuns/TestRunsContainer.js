import React from 'react';
import {Link} from 'react-router';
import Layout from '../../components/Layout';
import Pagination from '../../components/ui/Pagination';
import TestRunsTable from '../../components/TestRuns/TestRunsTable';
import TestRunsFilterContainer from './TestRunsFilterContainer';
import TrendingSection from '../../components/TestRuns/TrendingSection';
import Spinner from '../../components/ui/Spinner';
import {getTestRuns} from '../../api';

const EMPTY_TEST_RUNS = {
  content: []
};

class TestRunsContainer extends React.Component {
  constructor(){
    super();

    this.state = {
      isDataLoading: true,
      errorResponse: null,
      testRuns: EMPTY_TEST_RUNS
    }
  }

  componentDidMount() {
    this.setState({ isDataLoading: true });
    this.getTestRuns(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getTestRuns(nextProps);
  }

  getTestRuns(props) {
    getTestRuns(props.location.query.build,
                props.location.query.git,
                props.location.query.testSuite,
                props.location.query.page,
                props.location.query.size,
                props.location.query.sort)
      .then(testRuns       => this.setState({ isDataLoading: false, testRuns }) )
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  render() {
    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test runs">
          <div className="navbar-section">
            <div className="row">
              <div className="col-md-12">
                <ol className="breadcrumb">
                  <li><Link to="/">Dashboard</Link></li>
                </ol>
              </div>
            </div>

            <TestRunsFilterContainer {...this.props}/>
          </div>

          <TestRunsTable testRuns={this.state.testRuns.content} />

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testRuns} />

          <TrendingSection />
        </Spinner>
      </Layout>
    );
  }
}

export default TestRunsContainer;

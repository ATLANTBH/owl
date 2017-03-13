import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';


const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
    name: null
  }
}

const EMPTY_TEST_STEPS = {
  content: []
}

class TestStepsPage extends React.Component {
  constructor(){
    super();

    this.onExecutionResultModalClose = this.onExecutionResultModalClose.bind(this);

    this.state = {
      isExecutionResultShown: false,
      currentExecutionResult: null,
      isDataLoading: true,
      testRun: EMPTY_TEST_RUN,
      testSteps: EMPTY_TEST_STEPS
    }
  }

  componentDidMount() {
    this.getPageDate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getPageDate(nextProps);
  }

  getPageDate(props) {
    this.setState({ isDataLoading: true });

    const promises = [
      this.getTestRun(props.params.testRunId),
      this.getTestSteps(props.params.testRunId,
                      props.params.testGroupName,
                      props.location.query.page,
                      props.location.query.size)
    ];

    Promise.all(promises)
      .then(([testRun, testSteps]) => {
        this.setState({ isDataLoading: false, testRun, testSteps: testSteps });
      })
  }

  getTestSteps(testRunId, testGroupName, page = 0, size = 10) {
    return fetch(`/api/v1/test-runs/${testRunId}/test-steps?group=${testGroupName}&page=${page}&size=${size}`)
      .then(response => response.json());
  }

  getTestRun(testRunId) {
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return fetch(`/api/v1/test-runs/${testRunId}`)
      .then(response => response.json());
  }

  onShowExecutionResult(testStep) {
    this.setState({
      isExecutionResultShown: true,
      currentExecutionResult: testStep.exception
    });
  }

  onExecutionResultModalClose() {
    this.setState({
      isExecutionResultShown: false,
      currentExecutionResult: null
    });
  }

  render() {
    const group = (this.state.testSteps.content[0] || {}).group;

    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading}>
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">{this.state.testRun.build}</a></li>
                <li><Link to='/test-cases'>{this.state.testRun.testSuite.suite}</Link></li>
                {valueOrNull(group, <li className="active">{group}</li>)}
              </ol>
            </div>
          </div>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Description</th>
                <th>Expeced Result</th>
                <th>Execution Result</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {notEmpty(this.state.testSteps.content,
              this.state.testSteps.content.map(testStep =>
                <tr key={testStep.id}>
                  <td className="focused-cell">{testStep.context}</td>
                  <td>{testStep.description}</td>
                  <td><ExecutionResult executionResult={testStep.executionResult} onClick={() => this.onShowExecutionResult(testStep)} /></td>
                  <td>{testStep.duration}s</td>
                </tr>
              ),
              <tr>
                <td colSpan="4" className="text-center text-muted">No test steps available for this test case.</td>
              </tr>
            )}
            </tbody>
          </table>

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testSteps} />

          <Modal isShown={this.state.isExecutionResultShown} onClose={this.onExecutionResultModalClose}>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title text-muted">Failed Execution Result</h4>
            </div>
            <div className="modal-body">
              <p>{this.state.currentExecutionResult}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </Modal>
        </Spinner>
      </Layout>
    );
  }
}

function valueOrNull(input, value) {
  return input ? value : null;
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestStepsPage;

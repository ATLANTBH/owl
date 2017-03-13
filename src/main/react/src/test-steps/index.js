import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';

class TestStepsPage extends React.Component {
  constructor(){
    super();

    this.onExecutionResultModalClose = this.onExecutionResultModalClose.bind(this);

    this.state = {
      isExecutionResultShown: false,
      currentExecutionResult: null,
      isDataLoading: true,
      data: { content: [] }
    }
  }

  componentDidMount() {
    this.getTestRuns(this.props.params.testRunId,
                    this.props.params.testGroupName,
                    this.props.location.query.page,
                    this.props.location.query.size)
      .then(paginatedResponse => this.setState({ isDataLoading: false, data: paginatedResponse }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isDataLoading: true });

    this.getTestRuns(nextProps.params.testRunId,
                    nextProps.params.testGroupName,
                    nextProps.location.query.page,
                    nextProps.location.query.size)
      .then(paginatedResponse => this.setState({ isDataLoading: false, data: paginatedResponse }));
  }

  getTestRuns(testRunId, testGroupName, page = 0, size = 10) {
    return fetch(`/api/v1/test-runs/${testRunId}/test-steps?group=${testGroupName}&page=${page}&size=${size}`)
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
    const response = this.state.data;
    const testSteps = this.state.data.content;

    return (
      <Layout>
        <ol className="breadcrumb">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">#deadbeef</a></li>
          <li><a href="#">Test Suites</a></li>
          <li className="active">Default</li>
        </ol>

        <Spinner isShown={this.state.isDataLoading}>
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
            {testSteps.map(testStep =>
              <tr key={testStep.id}>
                <td className="focused-cell">{testStep.context}</td>
                <td>{testStep.description}</td>
                <td><ExecutionResult executionResult={testStep.executionResult} onClick={() => this.onShowExecutionResult(testStep)} /></td>
                <td>{testStep.duration}s</td>
              </tr>
            )}
            </tbody>
          </table>

          <Pagination to={this.props.location.pathname} paginatedResponse={response} />

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

export default TestStepsPage;

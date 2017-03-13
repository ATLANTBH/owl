import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';

class TestStepsPage extends React.Component {
  constructor(){
    super();
    this.state = {
      data: {content: []}
    }
  }

  componentDidMount() {
    this.getTestRuns(this.props.params.testRunId,
                    this.props.params.testGroupName,
                    this.props.location.query.page,
                    this.props.location.query.size)
      .then(paginatedResponse => this.setState({ data: paginatedResponse }));
  }

  componentWillReceiveProps(nextProps) {
    this.getTestRuns(nextProps.params.testRunId,
                    nextProps.params.testGroupName,
                    nextProps.location.query.page,
                    nextProps.location.query.size)
      .then(paginatedResponse => this.setState({ data: paginatedResponse }));
  }

  getTestRuns(testRunId, testGroupName, page = 0, size = 10) {
    return fetch(`/api/v1/test-runs/${testRunId}/test-steps?group=${testGroupName}&page=${page}&size=${size}`)
      .then(response => response.json());
  }

  render() {
    const response = this.state.data;
    const testSteps = this.state.data.content;

    return (
      <Layout>
        <ol className="breadcrumb">
          <li><a href="#">Home</a></li>
          <li><a href="#">Library</a></li>
          <li className="active">Data</li>
        </ol>

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
              <td><ExecutionResult executionResult={testStep.executionResult} /></td>
              <td>{testStep.duration}s</td>
            </tr>
          )}
          </tbody>
        </table>

        <Pagination to={this.props.location.pathname} paginatedResponse={response} />
      </Layout>
    );
  }
}

export default TestStepsPage;

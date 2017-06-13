import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Waypoint from 'react-waypoint';
import TestStepsTable from '../../components/TestSteps/TestStepsTable';
import Layout from '../../components/Layout';
import {getTestRun, getTestSteps, saveNotes} from '../../api';
import Spinner from '../../components/ui/Spinner';
import {linkToTestRunsByBuild} from '../../links';
import ExecutionResultModalContainer from './ExecutionResultModalContainer';
import EditNotesModalContainer from './EditNotesModalContainer';

const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
    name: null
  }
};

const EMPTY_TEST_STEPS = {
  number: -1,
  last: false,
  size: 20,
  content: []
};

class TestStepsContainer extends React.Component {
  constructor(){
    super();

    this.onExecutionResultModalClose = this.onExecutionResultModalClose.bind(this);
    this.onRequestPageData           = this.onRequestPageData.bind(this);
    this.onShowExecutionResultModal  = this.onShowExecutionResultModal.bind(this);
    this.onEditNotesModalClose       = this.onEditNotesModalClose.bind(this);
    this.onShowEditNotesModal        = this.onShowEditNotesModal.bind(this);
    this.onSaveNote                  = this.onSaveNote.bind(this);

    this.state = {
      isEditNotesModalShown: false,
      currentTestStep: null,
      isExecutionResultShown: false,
      currentExecutionResult: null,
      isInitialDataLoading: true,
      isDataLoading: true,
      errorResponse: null,
      testRun: EMPTY_TEST_RUN,
      testSteps: EMPTY_TEST_STEPS
    }
  }

  componentDidMount() {
    this.setState({ isInitialDataLoading: true });
    this.getPageData(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this.getPageData(nextProps, true);
  }

  onRequestPageData() {
    if (!this.state.testSteps.last) {
      this.getPageData(this.props);
    }
  }

  onShowExecutionResultModal(testStep) {
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

  onShowEditNotesModal(testStep) {
    this.setState({
      isEditNotesModalShown: true,
      currentTestStep: testStep
    });
  }

  onEditNotesModalClose() {
    this.setState({
      isEditNotesModalShown: false,
      currentTestStep: null
    });
  }

  onSaveNote(testStep, notes) {
    return saveNotes(this.state.testRun.id, testStep.id, notes)
      .then(updatedTestStep => {
        Object.assign(testStep, updatedTestStep);
        // this.forceUpdate();
      });
  }

  getPageData(props, resetPagination = false) {
    this.setState({ isDataLoading: true });

    const promises = [
      this.getTestRun(props.params.testRunId),
      getTestSteps(props.params.testRunId,
        props.params.splat,
        resetPagination ? 0 : (this.state.testSteps.number + 1),
        this.state.testSteps.size,
        props.location.query.sort)
    ];

    Promise.all(promises)
      .then(([testRun, testSteps]) =>
        this.setState((prev) =>
          Object.assign({}, {
            isInitialDataLoading: false,
            isDataLoading: false,
            testRun,
            testSteps: resetPagination ? testSteps : mergeTestSteps(prev.testSteps, testSteps)
          })
        )
      )
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  getTestRun(testRunId) {
    // Cache test run in this component
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return getTestRun(testRunId);
  }

  render() {
    return (
      <Layout>
        <Spinner isShown={this.state.isInitialDataLoading} errorResponse={this.state.errorResponse} text="Fetching test runs...">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to={linkToTestRunsByBuild(this.state.testRun.build)}>{this.state.testRun.build}</Link></li>
                <li><Link to={`/test-runs/${this.state.testRun.id}/test-cases`}>{this.state.testRun.testSuite.suite}</Link></li>
                <li className="active">Test Steps</li>
              </ol>
            </div>
          </div>

          <TestStepsTable
            testSteps={this.state.testSteps.content}
            onShowExecutionResultModal={this.onShowExecutionResultModal}
            onShowEditNotesModal={this.onShowEditNotesModal}/>

          <Waypoint onEnter={this.onRequestPageData} />

          <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test steps"/>

          <ExecutionResultModalContainer
            isExecutionResultShown={this.state.isExecutionResultShown}
            onExecutionResultModalClose={this.onExecutionResultModalClose}
            currentExecutionResult={this.state.currentExecutionResult}/>

          <EditNotesModalContainer
            isEditNotesModalShown={this.state.isEditNotesModalShown}
            onEditNotesModalClose={this.onEditNotesModalClose}
            onSaveNote={this.onSaveNote}
            testStep={this.state.currentTestStep}/>
        </Spinner>
      </Layout>
    );
  }
}

function mergeTestSteps(prev, next) {
  return {
    ...next,
    content: prev.content.concat(next.content)
  };
}

export default TestStepsContainer;

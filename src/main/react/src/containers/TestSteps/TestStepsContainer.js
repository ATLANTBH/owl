import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import TestStepsTable from '../../components/TestSteps/TestStepsTable';
import Layout from '../../components/Layout';
import { getTestRun, getTestSteps, saveNotes, addBugReportLink } from '../../api';
import Spinner from '../../components/ui/Spinner';
import ExecutionResultModalContainer from './ExecutionResultModalContainer';
import EditNotesModalContainer from './EditNotesModal/EditNotesModalContainer';
import AddBugReportLinkModalContainer from './AddBugReportLinkModal/AddBugReportLinkModalContainer';
import { mergePaginatedModels } from '../../utils/model';

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
  constructor() {
    super();

    this.onExecutionResultModalClose = this.onExecutionResultModalClose.bind(this);
    this.onRequestPageData = this.onRequestPageData.bind(this);
    this.onShowExecutionResultModal = this.onShowExecutionResultModal.bind(this);
    this.onEditNotesModalClose = this.onEditNotesModalClose.bind(this);
    this.onShowEditNotesModal = this.onShowEditNotesModal.bind(this);
    this.onSaveNote = this.onSaveNote.bind(this);
    this.onShowAddBugReportLinkModal = this.onShowAddBugReportLinkModal.bind(this);
    this.onAddBugReportLinkModalClose = this.onAddBugReportLinkModalClose.bind(this);
    this.onAddBugReportLink = this.onAddBugReportLink.bind(this);

    this.state = {
      isAddBugReportLinkModalShown: false,
      isEditNotesModalShown: false,
      currentTestStep: null,
      isExecutionResultShown: false,
      currentExecutionResult: null,
      currentExecutionResultImage: null,
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
      currentExecutionResult: testStep.exception,
      currentExecutionResultImage: testStep.screenshotUrl
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
            testSteps: resetPagination ? testSteps : mergePaginatedModels(prev.testSteps, testSteps)
          })
        )
      )
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }));
  }

  getTestRun(testRunId) {
    // Cache test run in this component
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return getTestRun(testRunId);
  }

  onShowAddBugReportLinkModal(testStep) {
    this.setState({
      isAddBugReportLinkModalShown: true,
      currentTestStep: testStep
    });
  }

  onAddBugReportLinkModalClose() {
    this.setState({
      isAddBugReportLinkModalShown: false,
      currentTestStep: null
    });
  }

  onAddBugReportLink(testStep, bugTitle, bugUrl) {
    return addBugReportLink(this.state.testRun.id, testStep.id, { bugTitle, bugUrl })
      .then(updatedTestStep => {
        Object.assign(testStep, updatedTestStep);
      });
  }

  render() {
    const testCase = this.props.params.splat;

    return (
      <Layout>
        <Spinner isShown={this.state.isInitialDataLoading} errorResponse={this.state.errorResponse} text="Fetching test runs...">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/">Dashboard</Link></li>
                <li title="Build">{this.state.testRun.build}</li>
                <li><Link to={`/test-runs/${this.state.testRun.id}/test-cases`}>{this.state.testRun.testSuite.suite}</Link></li>
                <li>{testCase}</li>
                <li className="active">Test Steps</li>
              </ol>
            </div>
          </div>

          <TestStepsTable
            testSteps={this.state.testSteps.content}
            onShowExecutionResultModal={this.onShowExecutionResultModal}
            onShowEditNotesModal={this.onShowEditNotesModal}
            onShowAddBugReportLinkModal={this.onShowAddBugReportLinkModal} />

          <Waypoint onEnter={this.onRequestPageData} />

          <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test steps" />

          <ExecutionResultModalContainer
            isExecutionResultShown={this.state.isExecutionResultShown}
            onExecutionResultModalClose={this.onExecutionResultModalClose}
            currentExecutionResult={this.state.currentExecutionResult}
            currentExecutionResultImage={this.state.currentExecutionResultImage} />

          <EditNotesModalContainer
            isEditNotesModalShown={this.state.isEditNotesModalShown}
            onEditNotesModalClose={this.onEditNotesModalClose}
            onSaveNote={this.onSaveNote}
            testStep={this.state.currentTestStep} />

          <AddBugReportLinkModalContainer
            isAddBugReportLinkModalShown={this.state.isAddBugReportLinkModalShown}
            onAddBugReportLinkModalClose={this.onAddBugReportLinkModalClose}
            onAddBugReportLink={this.onAddBugReportLink}
            testStep={this.state.currentTestStep} />
        </Spinner>
      </Layout>
    );
  }
}

export default TestStepsContainer;

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/ExecutionResult';
import Notes from '../../components/Notes';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import DurationFormat from '../../components/DurationFormat';
import TableHeader from '../../components/TableHeader';
import style from './table.css'
import { getTestRun, getTestSteps, postNotes } from '../api';

const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
    name: null
  }
}

const EMPTY_TEST_STEPS = {
  number: -1,
  last: false,
  size: 20,
  content: []
}

class TestStepsTable extends React.Component {
  constructor(){
    super();

    this.onExecutionResultModalClose = this.onExecutionResultModalClose.bind(this);
    this.onRequestPageData = this.onRequestPageData.bind(this);

    this.state = {
      isExecutionResultShown: false,
      currentExecutionResult: null,
      isInitialDataLoaded: false,
      isDataLoading: true,
      errorResponse: null,
      testRun: EMPTY_TEST_RUN,
      testSteps: EMPTY_TEST_STEPS,
      notes: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getPageData(nextProps, true);
  }

  onRequestPageData() {
    if (!this.state.testSteps.last) {
      this.getPageData(this.props);
    }
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
      .then(([testRun, testSteps]) => {
        this.setState((prev) => {
          return {
            isInitialDataLoaded: true,
            isDataLoading: false,
            testRun,
            testSteps: resetPagination ? testSteps : mergeTestSteps(prev.testSteps, testSteps)
          };
        });
      })
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  getTestRun(testRunId) {
    // Cache test run in this component
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return getTestRun(testRunId);
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
  

  saveNotes(notes, testStep){
    postNotes(this.state.testRun.id, testStep.id, notes)
      .then(updatedTestStep => {
        Object.assign(testStep, updatedTestStep);
        this.setState({
          testSteps: updatedTestStep
        });
      });
  }

  render() {
    // const group = (this.state.testSteps.content[0] || {}).group;
    const testRunLink = `/test-runs/${this.state.testRun.id}/test-cases`;

    function linkToBuild(build) {
      return `/test-runs?build=${build}`;
    }

    let testStepsTable = null;
    let breadCrumbs = null;

    if (this.state.isInitialDataLoaded) {
      breadCrumbs = <div className="row">
        <div className="col-md-12">
          <ol className="breadcrumb">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to={linkToBuild(this.state.testRun.build)}>{this.state.testRun.build}</Link></li>
            <li><Link to={testRunLink}>{this.state.testRun.testSuite.suite}</Link></li>
            {/*{valueOrNull(group, <li className="active">{group}</li>)}*/}
          </ol>
        </div>
        </div>;

      testStepsTable = <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <TableHeader sortKey="context">Description</TableHeader>
              <TableHeader sortKey="description">Expeced Result</TableHeader>
              <TableHeader sortKey="executionResult">Execution Result</TableHeader>
              <TableHeader sortKey="duration">Duration</TableHeader>
              <TableHeader>Notes</TableHeader>
            </tr>
          </thead>
          <tbody>
          {notEmpty(this.state.testSteps.content,
            this.state.testSteps.content.map(testStep =>
              <tr key={testStep.id}>
                <td className="focused-cell">{testStep.context}</td>
                <td>{testStep.description}</td>
                <td><ExecutionResult executionResult={testStep.executionResult} onClick={() => this.onShowExecutionResult(testStep)} /></td>
                <td><DurationFormat duration={testStep.duration} /></td>
                <td> <div className={style.notetext}>{testStep.notes}</div> <Notes className={style.button} note={testStep.notes} onClick={(notes) => this.saveNotes(notes, testStep)}>Notes</Notes></td> 
              </tr>
            ),
            <tr>
              <td colSpan="4" className="text-center text-muted">No test steps available for this test case.</td>
            </tr>
          )}  
          </tbody>
        </table>;
    }

    return (
      <Layout>
        {breadCrumbs}

        {testStepsTable}

        <Waypoint onEnter={this.onRequestPageData} />

        <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test steps"/>
        
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
      </Layout>
    );
  }
}

function mergeTestSteps(prev, next) {
  return  {
    ...next,
    content: prev.content.concat(next.content)
  };
}

function valueOrNull(input, value) {
  return input ? value : null;
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestStepsTable;

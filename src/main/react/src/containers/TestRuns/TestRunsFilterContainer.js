import React from 'react';
import Select from 'react-select';
import {getDistinctGit, getFilteredTestSuites, getTestSuite} from '../../api';
import {updateQueryParams} from '../../utils/location';
import FeatureToggle from '../../components/ui/FeatureToggle';

class TestRunsFilterContainer extends React.Component {
  constructor(){
    super();

    this.state = {
      filteredGitBranch: [],
      filteredTestSuites: []
    }
  }

  componentDidMount() {
    this.setFilteredGitBranch(this.props);
    this.setFilteredTestSuites(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setFilteredGitBranch(nextProps);
    this.setFilteredTestSuites(nextProps);
  }

  setFilteredGitBranch(props) {
    if (props.location.query.git) {
      this.setState({
        filteredGitBranch: props.location.query.git.split(',').map(value => {
          return {
            value,
            label: value
          }
        })
      });
    } else {
      this.setState({
        filteredGitBranch: []
      });
    }
  }

  setFilteredTestSuites(props) {
    if (props.location.query.testSuite) {
      let testSuiteIds = props.location.query.testSuite.split(',');

      function resolveTestSuite(id) {
        return getTestSuite(id)
          .then(testSuite => {
            return {
              value: testSuite.id,
              label: testSuite.suite
            };
          }, () => { return null; });
      }

      Promise.all(testSuiteIds.map(resolveTestSuite))
        .then(testSuites => {
          this.setState({
            filteredTestSuites: testSuites
          });
        });
    } else {
      this.setState({
        filteredTestSuites: []
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <FeatureToggle toggleKey="gitInfoFeatureToggle">
            <Select.Async
              name="select-git-branch"
              multi={true}
              value={this.state.filteredGitBranch}
              placeholder='Git Branch/Commit'
              loadOptions={onLoadDistinctGitBranch}
              onChange={onUpdateFilteredGitBranch}
              noResultsText='No results found'
            />
          </FeatureToggle>

          <Select.Async
            name="select-test-suites"
            multi={true}
            value={this.state.filteredTestSuites}
            placeholder='Test Suites'
            loadOptions={onLoadTestSuites}
            onChange={onUpdateFilteredTestSuites}
            noResultsText='No results found'
          />
        </div>
      </div>
    );
  }
}

function onUpdateFilteredTestSuites(options) {
  const testSuite = options.map(option => option.value).join();
  updateQueryParams({ testSuite });
}

function onUpdateFilteredGitBranch(options) {
  const git = options.map(option => option.value).join();
  updateQueryParams({ git });
}

function onLoadDistinctGitBranch(input, callback) {
  getDistinctGit(input)
    .then(function (data) {
      callback(null, {
        complete: data.length == 0,
        options: data.map(value => {
          return {
            value,
            label: value
          };
        })
      });
    });
}

function onLoadTestSuites(input, callback) {
  getFilteredTestSuites(input, 'suite')
    .then(function (testSuites) {
      callback(null, {
        complete: testSuites.content.length == 0,
        options: testSuites.content.map(testSuite => {
          return {
            value: testSuite.id,
            label: testSuite.suite
          };
        })
      });
    });
}

export default TestRunsFilterContainer;
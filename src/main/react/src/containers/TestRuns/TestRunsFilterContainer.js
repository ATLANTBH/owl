import React from 'react';
import Select from 'react-select';
import {getDistinctBuilds, getDistinctGit, getFilteredTestSuites, getTestSuite} from '../../api';
import {updateQueryParams} from '../../utils/location';
import FeatureToggle from '../../components/ui/FeatureToggle';

class TestRunsFilterContainer extends React.Component {
  constructor(){
    super();

    this.onLoadTestSuites = this.onLoadTestSuites.bind(this);

    this.state = {
      filteredBuilds: [],
      filteredGitBranch: [],
      filteredTestSuites: []
    }
  }

  componentDidMount() {
    this.setFilteredBuilds(this.props);
    this.setFilteredGitBranch(this.props);
    this.setFilteredTestSuites(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setFilteredBuilds(nextProps);
    this.setFilteredGitBranch(nextProps);
    this.setFilteredTestSuites(nextProps);
  }

  setFilteredBuilds(props) {
    if (props.location.query.build) {
      this.setState({
        filteredBuilds: props.location.query.build.split(',').map(build => {
          return {
            value: build,
            label: build
          }
        })
      });
    } else {
      this.setState({
        filteredBuilds: []
      });
    }
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

  onLoadDistinctBuilds(input, callback) {
    getDistinctBuilds(input)
      .then(function (data) {
        callback(null, {
          complete: true,
          options: data.map(value => {
            return {
              value,
              label: value
            };
          })
        });
      });
  }

  onLoadDistinctGitBranch(input, callback) {
    getDistinctGit(input)
      .then(function (data) {
        callback(null, {
          complete: true,
          options: data.map(value => {
            return {
              value,
              label: value
            };
          })
        });
      });
  }

  onLoadTestSuites(input, callback) {
    getFilteredTestSuites(input, 'suite')
      .then(function (testSuites) {
        callback(null, {
          complete: true,
          options: testSuites.content.map(testSuite => {
            return {
              value: testSuite.id,
              label: testSuite.suite
            };
          })
        });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Select.Async
            name="select-builds"
            multi={true}
            value={this.state.filteredBuilds}
            placeholder='Jenkins Builds'
            loadOptions={this.onLoadDistinctBuilds}
            onChange={onUpdateFilteredBuilds}
          />

          <FeatureToggle toggleKey="gitInfoFeatureToggle">
            <Select.Async
              name="select-git-branch"
              multi={true}
              value={this.state.filteredGitBranch}
              placeholder='Git Branch/Commit'
              loadOptions={this.onLoadDistinctGitBranch}
              onChange={onUpdateFilteredGitBranch}
            />
          </FeatureToggle>

          <Select.Async
            name="select-test-suites"
            multi={true}
            value={this.state.filteredTestSuites}
            placeholder='Test Suites'
            loadOptions={this.onLoadTestSuites}
            onChange={onUpdateFilteredTestSuites}
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

function onUpdateFilteredBuilds(options) {
  const build = options.map(option => option.value).join();
  updateQueryParams({ build });
}

function onUpdateFilteredGitBranch(options) {
  const git = options.map(option => option.value).join();
  updateQueryParams({ git });
}

export default TestRunsFilterContainer;
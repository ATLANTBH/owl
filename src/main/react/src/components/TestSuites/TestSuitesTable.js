import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TimeFormat from '../ui/TimeFormat';
import TableHeader from '../ui/TableHeader';
import {linkToTestRunsBySuite} from '../../links';

class TestSuitesTable extends React.Component {
  static propTypes = {
    testSuites: PropTypes.array.isRequired
  };

  render() {
    function onRowClick(testSuite) {
      browserHistory.push(linkToTestRunsBySuite(testSuite.id));
    }

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <TableHeader sortKey="suite">Name</TableHeader>
            <TableHeader sortKey="createdAt">Created</TableHeader>
          </tr>
        </thead>
        <tbody>
          {notEmpty(this.props.testSuites,
            this.props.testSuites.map(testSuite =>
              <tr className="navigateable-row" key={testSuite.id} onClick={(ev) => onRowClick(testSuite, ev)}>
                <td className="focused-cell">{testSuite.suite}</td>
                <td><TimeFormat time={testSuite.createdAt} /></td>
              </tr>
            ),
            <tr>
              <td colSpan="2" className="text-center text-muted">No test suites available.</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestSuitesTable;

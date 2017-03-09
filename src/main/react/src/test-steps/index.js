import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';

class TestStepsPage extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  render() {
    // TODO(kklisura): Make API calls to fetch test steps
    const response = JSON.parse('{"content":[{"id":422,"group":"Rails5 Edit account info test","context":"Open Teamer landing page","description":"Landing page is displayed","executionResult":"passed","exception":"","pendingMessage":"","duration":0.162147993,"backtrace":null,"metadata":null,"createdAt":1484824155659,"updatedAt":1484824155662},{"id":423,"group":"Rails5 Edit account info test","context":"Click login button","description":"Login form is expanded","executionResult":"failed","exception":"","pendingMessage":"","duration":0.589115706,"backtrace":null,"metadata":null,"createdAt":1484824156254,"updatedAt":1484824156264},{"id":424,"group":"Rails5 Edit account info test","context":"Enter login information and submit","description":"Dashboard is displayed","executionResult":"passed","exception":"","pendingMessage":"","duration":1.903786774,"backtrace":null,"metadata":null,"createdAt":1484824158170,"updatedAt":1484824158173},{"id":425,"group":"Rails5 Edit account info test","context":"Open account edit page","description":"Account profile edit page is displayed","executionResult":"passed","exception":"","pendingMessage":"","duration":9.515371574,"backtrace":null,"metadata":null,"createdAt":1484824167690,"updatedAt":1484824167692},{"id":426,"group":"Rails5 Edit account info test","context":"Edit account information","description":"Account information is updated","executionResult":"passed","exception":"","pendingMessage":"","duration":5.134167366,"backtrace":null,"metadata":null,"createdAt":1484824172829,"updatedAt":1484824172841},{"id":427,"group":"Rails5 Edit account info test","context":"Logout user","description":"Landing page displayed","executionResult":"passed","exception":"","pendingMessage":"","duration":9.712768827,"backtrace":null,"metadata":null,"createdAt":1484824182557,"updatedAt":1484824182559}],"last":true,"totalElements":6,"totalPages":10,"size":20,"number":0,"first":true,"sort":null,"numberOfElements":6}');

    const testSteps = response.content;

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
            <tr>
              <td className="focused-cell">{testStep.context}</td>
              <td>{testStep.description}</td>
              <td><ExecutionResult executionResult={testStep.executionResult} /></td>
              <td>{testStep.duration}s</td>
            </tr>
          )}
          </tbody>
        </table>

        <Pagination paginatedResponse={response} />
      </Layout>
    );
  }

}

export default TestStepsPage;

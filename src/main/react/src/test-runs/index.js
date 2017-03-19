import React from 'react';
import Layout from '../../components/Layout';
import TestRunsPageTable from './table';

class TestRunsPage extends React.Component {
  render() {
    return (
      <Layout>
        <TestRunsPageTable {...this.props} />
      </Layout>
    );
  }
}

export default TestRunsPage;

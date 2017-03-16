import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TestRunsTablePage from '../test-runs/table';
import TrendingSection from './trending-section';
import Layout from '../../components/Layout';

class DashboardPage extends React.Component {
  render() {
    return (
      <Layout>
        <TestRunsTablePage {...this.props} />
        <TrendingSection />
      </Layout>
    );
  }
}

export default DashboardPage;

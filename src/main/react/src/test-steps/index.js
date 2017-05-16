import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import Layout from '../../components/Layout';
import TestStepsTable from './table';


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

class TestStepsPage extends React.Component {
  render() {
    return (
        <TestStepsTable {...this.props} />
    );
  }
}

export default TestStepsPage;

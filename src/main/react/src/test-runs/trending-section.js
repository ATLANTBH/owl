import React, { PropTypes } from 'react';
import TrendingSectionChart from './trending-section-chart';

class TrendingSection extends React.Component {
  render() {
    return (
      <div className="trending-section">
        {bootstrap.suiteStatistics.map(suite =>
          <TrendingSectionChart key={suite.id} testSuiteName={suite.suite}
            testSuiteId={suite.id}/>
        )}
      </div>
    );
  }
}

export default TrendingSection;

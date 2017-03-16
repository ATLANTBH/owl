import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import Spinner from '../../components/Spinner';

class TrendingSectionChart extends React.Component {
  static propTypes = {
    testSuiteName: PropTypes.string.isRequired,
    testSuiteId: PropTypes.number.isRequired
  };

  constructor(){
    super();

    this.state = {
      isStatisticsLoading: true,
      statistic: null,
    }
  }

  componentDidMount() {
    this.getStatistics(this.props.testSuiteId)
      .then(statistic => {
        this.setState({
          isStatisticsLoading: false,
          statistic: getStatistics(statistic)
        })
      });
  }

  getStatistics(suiteId) {
    return fetch(`/api/v1/test-suites/${suiteId}/statistics`)
      .then(response => response.json());
  }

  getChartOptions() {
    return {
      animation: {
        duration: 0
      },
      legend: {
          display: false
      },
      scales: {
          yAxes: [{
              ticks: {
                  max: 100,
                  min: 0,
                  stepSize: 10
              }
          }]
      }
    };
  }

  render() {
    return (
      <Spinner isShown={this.state.isStatisticsLoading}>
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              <h1>{this.props.testSuiteName}</h1>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <Line data={this.state.statistic} options={this.getChartOptions()} height={100} />
        </div>
      </Spinner>
    );
  }
}

function getStatistics(statistics) {
  return {
      labels: statistics.map(stats => stats.build),
      datasets: [{
        lineTension: 0,
        type: 'line',
        label: 'Success Percentage',
        data: statistics.map(stats =>  (1 - ((stats.failedCasesCount + stats.pendingCasesCount) / stats.passedCasesCount)) * 100),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#7E8FA9'
      }]
  };
}

export default TrendingSectionChart;

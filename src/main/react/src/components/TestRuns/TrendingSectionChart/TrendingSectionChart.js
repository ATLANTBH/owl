import React, {PropTypes} from 'react';
import {Line} from 'react-chartjs-2';
import Spinner from '../../ui/Spinner';
import {durationFormat} from '../../../utils/time';

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
      scales: {
          yAxes: [{
              ticks: {
                  max: 100,
                  min: 0,
                  stepSize: 10
              }
          }]
      },
      tooltips: {
        callbacks: {
          title: function ([tooltipItem]) {
            return 'Jenkins Build: ' + tooltipItem.xLabel;
          },
          label: function (tooltipItem, data) {
            const datasetLabel = data.datasets[tooltipItem.datasetIndex].label;

            if (datasetLabel === 'Duration') {
              const datasetData = data.datasets[tooltipItem.datasetIndex].unscaledData
              const dataValue = datasetData[tooltipItem.index];

              return datasetLabel + ': ' + durationFormat(dataValue);
            }
            return datasetLabel + ': ' + tooltipItem.yLabel + '%';
          }
        }
      }
    };
  }

  render() {
    return (
      <Spinner isShown={this.state.isStatisticsLoading} text="Fetching test suite statistics">
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
  const maxDuration = Math.max(...statistics.map(stats => stats.duration));

  return {
      labels: statistics.map(stats => stats.build),
      datasets: [{
        lineTension: 0,
        type: 'line',
        label: 'Success Percentage',
        data: statistics.map(stats =>  (1 - ((stats.failedCasesCount + stats.pendingCasesCount) / stats.totalCasesCount)) * 100).map(round),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#7E8FA9'
      }, {
        lineTension: 0,
        type: 'line',
        label: 'Duration',
        data: statistics.map(stats => ((stats.duration / maxDuration)) * 100).map(round),
        unscaledData: statistics.map(stats => stats.duration),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#D9A17D'
      }]
  };
}

function round(value) {
  return Math.floor((value || 0) * 100) / 100;
}

export default TrendingSectionChart;

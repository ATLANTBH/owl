/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {
  constructor(){
    super();
    this.state = {
      data: {}
    }

    
  }
  // static propTypes = {
  //   articles: PropTypes.arrayOf(PropTypes.shape({
  //     url: PropTypes.string.isRequired,
  //     title: PropTypes.string.isRequired,
  //     author: PropTypes.string.isRequired,
  //   }).isRequired).isRequired,
  // };

 componentDidMount() {
  fetch('/api/v1/test-runs').then((json) => json.json())
  .then((function(response){
    console.log(response.content);
  }))
}




  render() {

    // const data = [{
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }, {
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }, {
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }, {
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }, {
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }, {
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }, {
    //   build: '#06436db',
    //   suite: 'Smoke Test',
    //   exampleCount: 38,
    //   failureCount: 34,
    //   pendingCount: 10,
    //   duration: '654.7s'
    // }];

    return (
      <Layout className={s.content}>
        <div className="row">
          <div className="col-md-6">
            <div className="page-header">
              <h1>Latest Builds <small><a href="#">See All</a></small></h1>
            </div>
          </div>

          <div className="col-md-6 text-right">
            <div className="filter-section">
              <span className="text-muted filter-section-title">Filter by:</span>
              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Test Suite <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>


              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Execution Time <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Success Rate <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Build ID</th>
              <th>Test Suites</th>
              <th>Execution Finished</th>
              <th>Example Count</th>
              <th>Failure Count</th>
              <th>Pending Count</th>
              <th>Success Rate</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {/*{this.state.data.map(item =>
              <tr>
                <td><a href="#">{item.build}</a></td>
                <td><a href="#">{item.suite}</a></td>
                <td></td>
                <td>{item.exampleCount}</td>
                <td>{item.failureCount}</td>
                <td>{item.pendingCount}</td>
                <td></td>
                <td>{item.duration}</td>
              </tr>
            )}*/}
          </tbody>
        </table>
      </Layout>
    );
  }

}

export default HomePage;

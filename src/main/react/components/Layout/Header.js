import React from 'react';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Test Report</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="../dashboard">Dashboard</a></li>
            <li><a href="../builds">Builds</a></li>
            <li><a href="../suites">Suites</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

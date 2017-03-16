import React from 'react';
import { Link } from 'react-router';

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
          <Link to="/" className="navbar-brand">{bootstrap.projectName}</Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/test-suites">Suites</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

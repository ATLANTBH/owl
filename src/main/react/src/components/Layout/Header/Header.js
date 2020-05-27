import React from 'react';
import { Link } from 'react-router';
import { isUserLoggedIn, logout } from '../../../auth';
import logo from '../images/Logo.png';
import style from '../style.css';

function Header() {
  // TODO(kklisura): Change Test Suites link.
  let login = isUserLoggedIn();
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header">
        <Link to="/"><img src={logo} className={style.logo} /></Link>

        <button type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
          aria-expanded="false"
          aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link to="/" className="navbar-brand">{login ? bootstrap.projectName : "Login"}</Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse" style={{ visibility: login ? 'visible' : 'hidden' }}>
        <ul className="nav navbar-nav navbar-left">
          <li><Link to="/test-suites">Test Suites</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={() => logout()}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

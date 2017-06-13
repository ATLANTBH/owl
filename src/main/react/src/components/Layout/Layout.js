import React from 'react';
import Header from './Header';
import Footer from './Footer';
import style from './style.css';

function Layout(props) {
  return (
    <div className={style.content}>
      <Header />
      <div className="clearfix">
        <div className="col-md-offset-1 col-md-10">
          {props.children}
        </div>
      </div>
      <div className="clearfix">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

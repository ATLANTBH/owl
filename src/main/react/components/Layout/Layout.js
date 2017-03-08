import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Footer from './Footer';
import s from './Layout.css';

class Layout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={s.content}>
        <Header />
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <div  {...this.props} />
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;

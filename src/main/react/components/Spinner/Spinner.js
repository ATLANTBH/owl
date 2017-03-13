import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

class Spinner extends React.Component {
  static propTypes = {
    isShown: PropTypes.bool.isRequired
  }

  render() {
    if (this.props.isShown) {
      return <div className={style.spinner}>
          <div className={classnames(style.rectBase, style.rect1)}></div>
          <div className={classnames(style.rectBase, style.rect2)}></div>
          <div className={classnames(style.rectBase, style.rect3)}></div>
          <div className={classnames(style.rectBase, style.rect4)}></div>
          <div className={classnames(style.rectBase, style.rect5)}></div>
        </div>;
    }

    return <div>{this.props.children}</div>;
  }
}

export default Spinner;

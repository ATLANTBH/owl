import React, { PropTypes } from 'react';
import classNames from 'classnames';
import style from './style.css';

class Spinner extends React.Component {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    text: PropTypes.string,
    errorResponse: PropTypes.object
  };
  render() {
    if (this.props.isShown) {
      return (
        <div className={style.spinner}>
          <div className={classNames(style.rectBase, style.rect1)}></div>
          <div className={classNames(style.rectBase, style.rect2)}></div>
          <div className={classNames(style.rectBase, style.rect3)}></div>
          <div className={classNames(style.rectBase, style.rect4)}></div>
          <div className={classNames(style.rectBase, style.rect5)}></div>
          <div className={style.loadingText}>{this.props.text}</div>
        </div>
      );
    }

    if (this.props.errorResponse) {
      console.log(this.props.errorResponse.status);
      return (
        <div className="text-center">
          <div className={style.error}>
            <i className={classNames('glyphicon glyphicon-fire', style.errorIcon)} />
            <div className={style.errorText}>{this.props.errorResponse.message}</div>
          </div>
        </div>
      );
    }

    return (<div>{this.props.children}</div>);
  }
}

export default Spinner;

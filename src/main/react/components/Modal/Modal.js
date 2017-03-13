import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router'
import $ from 'jquery';

class Modal extends React.Component {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  componentDidUpdate() {
    if (this.props.isShown) {
      $(this.refs.modal).modal();
      $(this.refs.modal).on('hidden.bs.modal', () => {
        $(this.refs.modal).off('hidden.bs.modal');

        this.props.onClose();
      });
    }
  }

  render() {
    if (this.props.isShown) {
      return (
        <div className="modal fade" tabIndex="-1" role="dialog" ref="modal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">{this.props.children}</div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Modal;

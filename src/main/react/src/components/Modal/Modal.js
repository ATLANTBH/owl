import $ from 'jquery';
import React, {PropTypes} from 'react';

class Modal extends React.Component {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isShown: props.isShown
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isShown && !nextProps.isShown) {
      $(this.refs.modal).modal('hide');
    } else {
      this.setState({
        isShown: nextProps.isShown
      });
    }
  }

  componentDidUpdate() {
    if (this.props.isShown) {
      $(this.refs.modal).modal();
      $(this.refs.modal).on('hidden.bs.modal', () => {
        $(this.refs.modal).off('hidden.bs.modal');

        this.setState({
          isShown: false
        });

        this.props.onClose();
      });
    }
  }

  render() {
    if (this.state.isShown) {
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

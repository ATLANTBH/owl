import $ from 'jquery';
import React, {PropTypes} from 'react';

class TooltipSpan extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    placement: PropTypes.string,
    className: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text ||
           this.props.title !== nextProps.title;
  }

  componentDidUpdate() {
    if (this.refs.span) {
      $(this.refs.span).tooltip('destroy');
      this.initializeTooltip();
    }
  }

  componentDidMount() {
    if (this.refs.span) {
      this.initializeTooltip();
    }
  }

  initializeTooltip() {
    $(this.refs.span).tooltip({
      title: this.props.title || this.props.text,
      placement: this.props.placement
    });
  }

  render() {
    return (
      <span ref="span" className={this.props.className}>{this.props.text}</span>
    );
  }
}

export default TooltipSpan;

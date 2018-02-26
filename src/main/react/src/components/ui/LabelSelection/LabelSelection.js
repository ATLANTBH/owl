import React, {PropTypes} from 'react';
import classNames from 'classnames';

class LabelSelection extends React.Component {
  static propTypes = {
    onLabelSelected: PropTypes.func,
    labels: PropTypes.array,
    selectedLabel: PropTypes.string
  };

  onLabelSelected(label, ev) {
    this.props.onLabelSelected(label);
    ev.preventDefault();
  }

  render() {
    let selectedLabel = this.props.labels.find(label => label.id === this.props.selectedLabel);
    if (!selectedLabel) {
      selectedLabel = this.props.labels[0];
    }

    function labelRender(label, index) {
      return (<li key={index}>
        <a href="#" onClick={this.onLabelSelected.bind(this, label)}><span className={classNames('label', label.className)}>{label.title}</span></a>
      </li>);
    }

    return (
      <div className="dropdown" onClick={(ev) => ev.stopPropagation()}>
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <span className={classNames('label', selectedLabel.className)}>{selectedLabel.title}</span>
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {this.props.labels.map(labelRender.bind(this))}
        </ul>
      </div>
    );
  }
}

export default LabelSelection;

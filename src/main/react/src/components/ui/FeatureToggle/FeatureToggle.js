import React, {PropTypes} from 'react';
import {whenFeatureToggled} from '../../../utils/features';

class FeatureToggle extends React.Component {
  static propTypes = {
    toggleKey: PropTypes.string.isRequired
  };

  render() {
    return whenFeatureToggled(this.props.toggleKey, this.props.children, null);
  }
}

export { whenFeatureToggled };

export default FeatureToggle;

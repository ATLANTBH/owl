import React, { PropTypes } from 'react';

class FeatureToggle extends React.Component {
  static propTypes = {
    toggleKey: PropTypes.string.isRequired
  };

  render() {
    if (isFeatureToggled(this.props.toggleKey)) {
      return this.props.children;
    }

    return null;
  }
}

export function isFeatureToggled(key) {
  return bootstrap[key];
}

export function ifFeatureToggled(key, valueIf, valueIfNot) {
  return isFeatureToggled(key) ? valueIf : valueIfNot;
}

export default FeatureToggle;

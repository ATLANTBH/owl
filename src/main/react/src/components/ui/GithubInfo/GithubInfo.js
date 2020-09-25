import React, {PropTypes} from 'react';
import {shortString} from '../../../utils/string';
import {getProperty} from '../../../utils/properties';

class GithubInfo extends React.Component {
  static propTypes = {
    hash: PropTypes.string,
    branch: PropTypes.string
  };

  render() {
    const branchLink = this.props.branch ? githubBranchLink(this.props.branch) : null;

    const shortHash = '#' + shortString(this.props.hash, 8);
    const hashTitle = this.props.branch ? '(' + shortHash + ')' : shortHash;

    const hashLink = this.props.hash ? githubCommitLink(this.props.hash, hashTitle) : null;

    return (<span>{branchLink} {hashLink}</span>);
  }
}

function githubBranchLink(branch, title) {
  return (<span>{title ? title : branch}</span>)
}

function githubCommitLink(commit, title) {
  return (<span>{title ? title : commit}</span>)
}

export default GithubInfo;

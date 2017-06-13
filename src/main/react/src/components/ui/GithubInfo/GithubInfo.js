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
  const githubRepoLink = getProperty('githubRepoLink');
  return (<a href={githubRepoLink + '/tree/' + branch} target="_blank">{title ? title : branch}</a>)
}

function githubCommitLink(commit, title) {
  const githubRepoLink = getProperty('githubRepoLink');
  return (<a href={githubRepoLink + '/commit/' + commit} target="_blank">{title ? title : commit}</a>)
}

export default GithubInfo;

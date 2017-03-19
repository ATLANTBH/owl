import React, { PropTypes } from 'react';

class GithubInfo extends React.Component {
  static propTypes = {
    hash: PropTypes.string,
    branch: PropTypes.string
  };

  render() {
    const githubRepoLink = bootstrap['githubRepoLink'];

    function githubBranchLink(branch, title) {
      return (<a href={githubRepoLink + '/tree/' + branch} target="_blank">{title ? title : branch}</a>)
    }

    function githubCommitLink(commit, title) {
      return (<a href={githubRepoLink + '/commit/' + commit} target="_blank">{title ? title : commit}</a>)
    }

    const branch = this.props.branch ?
      githubBranchLink(this.props.branch) :
      null;

    const hashTitle = this.props.branch ?
      '(#' + this.props.hash + ')' :
      '#' + this.props.hash;

    const hash = this.props.hash ?
      githubCommitLink(this.props.hash, hashTitle) :
      null;

    return (<span>{branch} {hash}</span>);
  }
}

export default GithubInfo;

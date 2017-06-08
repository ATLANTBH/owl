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

    function shorttenHash(hash) {
      return (hash || '').substr(0, 8);
    }

    const branch = this.props.branch ?
      githubBranchLink(this.props.branch) :
      null;

    const shortHash = '#' + shorttenHash(this.props.hash);
    const hashTitle = this.props.branch ? '(' + shortHash + ')' : shortHash;

    const hash = this.props.hash ?
      githubCommitLink(this.props.hash, hashTitle) :
      null;

    return (<span>{branch} {hash}</span>);
  }
}

export default GithubInfo;

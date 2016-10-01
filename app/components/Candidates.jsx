import Cookies from 'js-cookie';
import React from 'react';
import PropTypes from '../helpers/PropTypes';
// import CreateCandidateMutation from '../mutations/CreateCandidate';
import CreateVoteMutation from '../mutations/CreateVote';

export default class CandidatesComponent extends React.Component {

  static propTypes = {
    root: PropTypes.shape({
      candidates: PropTypes.connection({
        id: React.PropTypes.string.isRequired,
        fullName: React.PropTypes.string.isRequired,
        gravatar: React.PropTypes.string.isRequired,
        voteCount: React.PropTypes.number.isRequired,
      }),
    }),
  }

  // handleAdd = (attrs = {}) => {
  //   this.props.relay.commitUpdate(
  //     new CreateCandidateMutation(attrs)
  //   );
  // }

  buildHandleVote = candidateId => () => {
    this.props.relay.commitUpdate(
      new CreateVoteMutation({ candidateId }),
      { onSuccess: () => Cookies.set('voted', true, { expires: 10 }) }
    );
  }
  renderVoteButton(candidateId) {
    const voted = false; // !!Cookies.get('voted');
    return (
      <button onClick={this.buildHandleVote(candidateId)} disabled={voted}>Vote!</button>
    );
  }

  renderCandidates() {
    const { candidates } = this.props.root;
    return candidates.edges.map(({ node: candidate }) => (
      <li key={candidate.id}>
        {this.renderVoteButton(candidate.id)}
        &nbsp;
        <img alt="avatar" src={`${candidate.gravatar}?s=20`} />
        &nbsp;
        {candidate.fullName} &mdash; {candidate.voteCount} vote(s)
      </li>)
    );
  }

  render() {
    return (
      <div>
        <h1>Candidates</h1>
        <ul>
          {this.renderCandidates()}
        </ul>
      </div>
    );
  }
}

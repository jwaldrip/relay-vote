import React from 'react';
import PropTypes from '../helpers/PropTypes';
import CandidateForm from './CandidateForm';
import CreateCandidateMutation from '../mutations/CreateCandidate';

export default class Candidates extends React.Component {

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

  handleAdd = (attrs = {}) => {
    this.props.relay.commitUpdate(
      new CreateCandidateMutation(attrs)
    );
  }

  renderCandidates() {
    const { candidates } = this.props.root;
    return candidates.edges.map(({ node: candidate }) => (
      <li key={candidate.id}>
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
        <CandidateForm handleAdd={this.handleAdd} />
        <ul>
          {this.renderCandidates()}
        </ul>
      </div>
    );
  }
}

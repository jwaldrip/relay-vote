import React from 'react';
import PropTypes from '../helpers/PropTypes';

export default class TopCandidatesComponent extends React.Component {

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

  componentDidMount() {
    // TODO: replace with subscriptions
    // setTimeout(() => this.props.relay.forceFetch(), 3000);
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
        <h1>Top Candidates</h1>
        <ul>
          {this.renderCandidates()}
        </ul>
      </div>
    );
  }
}

import React from 'react';

export default class Candidates extends React.Component {

  static propTypes = {
    candidates: React.PropTypes.object
  }

  renderCandidates() {
    const { candidates } = this.props;
    return candidates.edges.map(({ node: candidate }) => {
      return <li key={candidate.id}>
        {candidate.fullName} &mdash; {candidate.voteCount} vote(s)
      </li>;
    });
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

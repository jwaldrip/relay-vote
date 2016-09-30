import Relay from 'react-relay';

export default class CreateVoteMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { CreateVote }`;
  }

  getVariables() {
    return this.props;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateVotePayload {
        candidate {
          voteCount
        }
      }
    `;
  }

  getConfigs = () => [{
    type: 'FIELDS_CHANGE',
    fieldIDs: { candidate: this.props.candidateId },
  }];
}

import Relay from 'react-relay';

export default class CreateCandidateMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { CreateCandidate }`;
  }

  getVariables() {
    return this.props;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateCandidatePayload {
        createdCandidateEdge {
          node {
            id
            firstName
            lastName
            emailAddress
            gravatar
            voteCount
          }
        }
        root { candidates }
      }
    `;
  }

  getConfigs = () => [{
    type: 'RANGE_ADD',
    parentName: 'root',
    parentID: 'ROOT',
    connectionName: 'candidates',
    edgeName: 'createdCandidateEdge',
    rangeBehaviors: {
      '': 'append',
    },
  }];
}

import Relay from 'react-relay';
import TopCandidatesComponent from '../components/TopCandidates';

export default Relay.createContainer(TopCandidatesComponent, {
  initialVariables: {
    first: 3,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        candidates(first: $first, order: "-voteCount") {
          edges {
            node {
              id
              fullName
              voteCount
              gravatar
            }
          }
        }
      }
    `,
  },
});

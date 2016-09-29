import Relay from 'react-relay';
import Candidates from '../components/Candidates';

export default Relay.createContainer(Candidates, {
  initialVariables: {
    first: 100,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        candidates(first: $first) {
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

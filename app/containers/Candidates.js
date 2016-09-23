import Relay from 'react-relay';
import Candidates from '../components/Candidates';

export default Relay.createContainer(Candidates, {
  fragments: {
    candidates: () => Relay.QL`
      fragment on CandidateConnection {
        edges {
          node {
            id
            fullName
            voteCount
          }
        }
      }
    `
  }
});

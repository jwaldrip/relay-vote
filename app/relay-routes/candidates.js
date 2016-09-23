import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    candidates: () => Relay.QL`query { candidates }`,
  };
  static routeName = 'CandidatesRoute';
}

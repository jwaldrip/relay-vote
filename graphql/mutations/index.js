import { GraphQLObjectType } from 'graphql';
// import CreateCandidate from './CreateCandidate';
import CreateVote from './CreateVote';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // CreateCandidate,
    CreateVote,
  }),
});

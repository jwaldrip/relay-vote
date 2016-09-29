import { GraphQLObjectType } from 'graphql';
import CreateCandidate from './CreateCandidate';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    CreateCandidate,
  }),
});

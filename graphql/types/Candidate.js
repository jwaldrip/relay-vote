import { GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { globalIdField, connectionFromArray } from 'graphql-relay';
import { voteConnection } from '../connections/votes';
import { nodeInterface } from '../globalid';

export default new GraphQLObjectType({
  name: 'Candidate',
  fields: () => ({
    id: globalIdField(),
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    emailAddress: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gravatar: {
      type: new GraphQLNonNull(GraphQLString),
    },
    voteCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    votes: {
      type: voteConnection,
      resolve: (c, args) => connectionFromArray(c.votes, args),
    },
  }),
  interfaces: [nodeInterface],
});

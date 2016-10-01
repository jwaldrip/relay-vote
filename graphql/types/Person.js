import { GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { globalIdField, connectionFromArray } from 'graphql-relay';
import { votesConnection } from '../connections/votes';
import { nodeInterface } from '../globalid';

export default new GraphQLObjectType({
  name: 'Person',
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
      type: votesConnection,
      resolve: (c, args) => connectionFromArray(c.votes, args),
    },
  }),
  interfaces: [nodeInterface],
});

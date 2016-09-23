import { GraphQLString, GraphQLObjectType, GraphQLInt } from 'graphql';
import { connectionFromArray } from 'graphql-relay';
import { voteConnection } from '../connections/votes';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../globalid';

export default new GraphQLObjectType({
  name: 'Candidate',
  fields: () => ({
    id: globalIdField(),
    fullName: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    voteCount: {
      type: GraphQLInt,
    },
    votes: {
      type: voteConnection,
      resolve: (c, args) => connectionFromArray(c.votes, args)
    }
  }),
  interfaces: [ nodeInterface ]
});

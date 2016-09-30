import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import sortBy from 'sort-by';

import Candidate from '../models/Candidate';
import Vote from '../models/Vote';
import { candidateConnection } from '../connections/candidates';
import { voteConnection } from '../connections/votes';
import { nodeField, nodeInterface } from '../globalid';

const Root = new GraphQLObjectType({
  name: 'Root',
  interfaces: [nodeInterface],
  fields: () => ({
    root: {
      type: new GraphQLNonNull(Root),
      resolve: () => ({ id: 'ROOT' }),
    },
    id: globalIdField(),
    node: nodeField,
    candidates: {
      args: {
        ...connectionArgs,
        order: {
          type: new GraphQLList(GraphQLString),
        },
      },
      type: candidateConnection,
      resolve: (parent, args) => {
        const sortByOpts = args.order || ['id'];
        const candidates = Candidate.all().sort(sortBy(...sortByOpts));
        return connectionFromArray(candidates, args);
      },
    },
    votes: {
      args: connectionArgs,
      type: voteConnection,
      resolve: (parent, args) => connectionFromArray(Vote.all(), args),
    },
  }),
});

export default Root;

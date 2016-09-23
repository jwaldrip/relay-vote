import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';
import Candidate from './models/candidate';
import Vote from './models/vote';
import { candidateConnection } from './connections/candidates';
import { voteConnection } from './connections/votes';
import { connectionFromArray } from 'graphql-relay';
import { nodeField } from './globalid';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      node: nodeField,
      candidates: {
        type: candidateConnection,
        resolve: (parent, args) => connectionFromArray(Candidate.all(), args)
      },
      votes: {
        type: voteConnection,
        resolve: (parent, args) => connectionFromArray(Vote.all(), args)
      }
    }
  })
});

import { connectionFromArray } from 'graphql-relay';
import { GraphQLObjectType } from 'graphql';

import Candidate from '../models/candidate';
import Vote from '../models/vote';
import { candidateConnection } from '../connections/candidates';
import { voteConnection } from '../connections/votes';
import { nodeField } from '../globalid';

// const Viewer = new GraphQLObjectType({
//   name: 'Viewer',
//   fields: () => ({
//     candidates: {
//       type: candidateConnection,
//       resolve: (parent, args) => connectionFromArray(Candidate.all(), args)
//     },
//     votes: {
//       type: voteConnection,
//       resolve: (parent, args) => connectionFromArray(Vote.all(), args)
//     }
//   })
// })

export default new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    node: nodeField,
    // viewer: {
    //   type: Viewer,
    //   resolve: () => {},
    // }
    candidates: {
      type: candidateConnection,
      resolve: (parent, args) => connectionFromArray(Candidate.all(), args)
    },
    votes: {
      type: voteConnection,
      resolve: (parent, args) => connectionFromArray(Vote.all(), args)
    }
  })
});

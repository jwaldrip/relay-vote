import { GraphQLString, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import Candidate from './Candidate';
import { nodeInterface } from '../globalid';

export default new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: globalIdField(),
    voterName: {
      type: GraphQLString,
    },
    candidate: {
      type: Candidate,
    },
  }),
  interfaces: [nodeInterface],
});

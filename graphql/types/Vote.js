import { GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import Person from './Person';
import { nodeInterface } from '../globalid';

export default new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: globalIdField(),
    candidate: {
      type: Person,
    },
  }),
  interfaces: [nodeInterface],
});

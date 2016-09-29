import { GraphQLSchema } from 'graphql';
import query from './types';
import mutation from './mutations';

export default new GraphQLSchema({
  query,
  mutation,
});

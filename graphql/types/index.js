import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import sortBy from 'sort-by';

import Person from '../models/Person';
import Vote from '../models/Vote';
import { peopleConnection } from '../connections/people';
import { votesConnection } from '../connections/votes';
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
    voters: {
      args: {
        ...connectionArgs,
        order: {
          type: new GraphQLList(GraphQLString),
        },
      },
      type: peopleConnection,
      resolve: (parent, args) => {
        const sortByOpts = args.order || ['id'];
        const people = Person.all().filter(
          person => person.voted
        ).sort(
          sortBy(...sortByOpts)
        );
        return connectionFromArray(people, args);
      },
    },
    candidates: {
      args: {
        ...connectionArgs,
        order: {
          type: new GraphQLList(GraphQLString),
        },
      },
      type: peopleConnection,
      resolve: (parent, args) => {
        const sortByOpts = args.order || ['id'];
        const candidates = Person.all().sort(sortBy(...sortByOpts));
        return connectionFromArray(candidates, args);
      },
    },
    votes: {
      args: connectionArgs,
      type: votesConnection,
      resolve: (parent, args) => connectionFromArray(Vote.all(), args),
    },
  }),
});

export default Root;

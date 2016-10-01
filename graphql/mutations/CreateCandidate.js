import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, cursorForObjectInConnection } from 'graphql-relay';
import Person from '../models/Person';
import { peopleEdge } from '../connections/people';
import RootType from '../types';

export default mutationWithClientMutationId({
  name: 'CreateCandidate',
  inputFields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    emailAddress: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    createdCandidateEdge: {
      type: peopleEdge,
      resolve: ({ candidate }) => ({
        cursor: cursorForObjectInConnection(Person.all(), candidate),
        node: candidate,
      }),
    },
    root: {
      type: RootType,
      resolve: () => ({}),
    },
  },
  mutateAndGetPayload: (attributes) => {
    const candidate = new Person(attributes);
    candidate.save();
    return { candidate };
  },
});

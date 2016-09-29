import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, cursorForObjectInConnection } from 'graphql-relay';
import Candidate from '../models/Candidate';
import { candidateEdge } from '../connections/candidates';
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
      type: candidateEdge,
      resolve: ({ candidate }) => ({
        cursor: cursorForObjectInConnection(Candidate.all(), candidate),
        node: candidate,
      }),
    },
    root: {
      type: RootType,
      resolve: () => ({}),
    },
  },
  mutateAndGetPayload: (attributes) => {
    const candidate = new Candidate(attributes);
    candidate.save();
    return { candidate };
  },
});

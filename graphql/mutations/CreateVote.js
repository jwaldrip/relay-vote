import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, cursorForObjectInConnection } from 'graphql-relay';
import Vote from '../models/Vote';
import Person from '../models/Person';
import { votesEdge } from '../connections/votes';
import PersonType from '../types/Person';

export default mutationWithClientMutationId({
  name: 'CreateVote',
  inputFields: {
    candidateId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    createdVoteEdge: {
      type: votesEdge,
      resolve: ({ vote }) => ({
        cursor: cursorForObjectInConnection(Vote.all(), vote),
        node: vote,
      }),
    },
    candidate: {
      type: PersonType,
    },
  },
  mutateAndGetPayload: ({ candidateId }) => {
    // TODO: Validate type
    const { id } = fromGlobalId(candidateId);
    const vote = new Vote();
    vote.candidate = Person.find(parseInt(id, 10));
    vote.save();
    return { vote, candidate: vote.candidate };
  },
});

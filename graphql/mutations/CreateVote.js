import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, cursorForObjectInConnection } from 'graphql-relay';
import Vote from '../models/Vote';
import Candidate from '../models/Candidate';
import { voteEdge } from '../connections/votes';
import CandidateType from '../types/Candidate';

export default mutationWithClientMutationId({
  name: 'CreateVote',
  inputFields: {
    candidateId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    createdVoteEdge: {
      type: voteEdge,
      resolve: ({ vote }) => ({
        cursor: cursorForObjectInConnection(Vote.all(), vote),
        node: vote,
      }),
    },
    candidate: {
      type: CandidateType,
    },
  },
  mutateAndGetPayload: ({ candidateId }) => {
    // TODO: Validate type
    const { id } = fromGlobalId(candidateId);
    const vote = new Vote();
    vote.candidate = Candidate.find(parseInt(id, 10));
    vote.save();
    return { vote, candidate: vote.candidate };
  },
});

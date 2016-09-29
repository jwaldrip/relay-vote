import { connectionDefinitions } from 'graphql-relay';
import nodeType from '../types/Vote';

const { connectionType: voteConnection, edgeType: voteEdge } =
connectionDefinitions({ nodeType });
export { voteConnection, voteEdge };

import { connectionDefinitions } from 'graphql-relay';
import nodeType from '../types/Vote';

const { connectionType: votesConnection, edgeType: votesEdge } =
connectionDefinitions({ nodeType });
export { votesConnection, votesEdge };

import { connectionDefinitions } from 'graphql-relay';
import nodeType from '../types/Candidate';


const { connectionType: candidateConnection, edgeType: candidateEdge } =
  connectionDefinitions({ nodeType });
export { candidateConnection, candidateEdge };

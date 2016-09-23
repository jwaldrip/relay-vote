import nodeType from '../types/Candidate';
import { connectionDefinitions } from 'graphql-relay';

const { connectionType: candidateConnection } = connectionDefinitions({ nodeType });
export { candidateConnection };

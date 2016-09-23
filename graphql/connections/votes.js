import nodeType from '../types/Vote';
import { connectionDefinitions } from 'graphql-relay';

const { connectionType: voteConnection } = connectionDefinitions({ nodeType });
export { voteConnection };

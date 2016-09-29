import { connectionDefinitions } from 'graphql-relay';
import nodeType from '../types/Vote';

const { connectionType: voteConnection } = connectionDefinitions({ nodeType });
export { voteConnection };

import { connectionDefinitions } from 'graphql-relay';
import nodeType from '../types/Person';

const { connectionType: peopleConnection, edgeType: peopleEdge } =
  connectionDefinitions({ nodeType });
export { peopleConnection, peopleEdge };

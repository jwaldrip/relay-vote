import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Root') {
      return { id: 'ROOT' };
    }
    return require(`./models/${type}`).default.find(parseInt(id, 10));
  },
  (obj) => {
    if (obj.id === 'ROOT') {
      return require('./types');
    }
    return require(`./types/${obj.constructor.name}`).default;
  }
);

export { nodeInterface, nodeField };

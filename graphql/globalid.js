import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return require(`./models/${type}`).default.find(parseInt(id, 10));
  },
  obj => require(`./types/${obj.constructor.name}`).default
);

export { nodeInterface, nodeField };

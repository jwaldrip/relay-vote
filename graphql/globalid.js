import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return require(`./models/${type}`).default.find(parseInt(id, 10));
  },
  (obj) => {
    const { name } = obj.constructor;
    const file = name === 'Root' ? 'index' : name;
    return require(`./types/${file}`).default;
  }

);

export { nodeInterface, nodeField };

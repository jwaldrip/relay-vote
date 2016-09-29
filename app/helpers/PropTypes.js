import { PropTypes } from 'react';

function connection(nodeShape = {}, edgesShape = {}, connectionShape = {}) {
  return PropTypes.shape({
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
      hasPreviousPage: PropTypes.bool.isRequired,
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
    }),
    edges: PropTypes.arrayOf(PropTypes.shape({
      cursor: PropTypes.string,
      node: PropTypes.shape(nodeShape),
      ...edgesShape,
    })),
    ...connectionShape,
  });
}

export default { ...PropTypes, connection };

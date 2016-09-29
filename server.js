import cors from 'cors';
import compression from 'compression';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import './seed';
import schema from './graphql/schema';
import webpackConfig from './webpack.config';

const app = express();

// Enable compression
app.use(compression());

// Enable Cors
app.use('/graphql', cors({
  origin: true,
  methods: ['POST'],
  allowedHeaders: 'Authorization,Content-Type,Accept',
}));

// Serve Webpack
app.use('/assets', webpackMiddleware(webpack(webpackConfig)));

// Serve GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Serve Static Assets
app.use('/', express.static('public'));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port);
console.log(  // eslint-disable-line no-console
  `Started on http://localhost:${port}/`
);

import './seed';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema.js';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackMiddleware from 'webpack-dev-middleware';

const app = express();

// Enable compression
app.use(compression());

// Enable Cors
app.use('/graphql', cors({
  origin: true,
  methods: [ 'POST' ],
  allowedHeaders: 'Authorization,Content-Type,Accept'
}));

// Serve Webpack
app.use('/assets', webpackMiddleware(webpack(webpackConfig)));

// Serve GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port);
console.log(  // eslint-disable-line no-console
  `Started on http://localhost:${port}/`
);

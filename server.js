import cors from 'cors';
import compression from 'compression';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import stackTrace from 'stack-trace';

import './seed';
import schema from './graphql/schema';
import webpackConfig from './webpack.config';

const app = express();

function formatError(error) {
  console.error('');  // eslint-disable-line no-console

  const { locations, message } = error;
  if (error.originalError) {
    // Display trace server side
    const trace = stackTrace.parse(error.originalError);
    console.error(error.originalError.toString());  // eslint-disable-line no-console
    trace.forEach((t, index) => {
      const file = t.getFileName();
      const ln = t.getLineNumber();
      const fn = t.getFunctionName();
      console.error(`${index}: ${file}:${ln}:in ${fn}`);  // eslint-disable-line no-console
    });
  }

  console.error(''); // eslint-disable-line no-console

  return { message, locations };
}


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
  graphiql: true,
  pretty: process.env.NODE_ENV !== 'production',
  formatError,
  schema,
}));

// Serve Static Assets
app.use('/', express.static('public'));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port);
console.log(  // eslint-disable-line no-console
  `Started on http://localhost:${port}/`
);

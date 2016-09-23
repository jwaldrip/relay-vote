import path from 'path';

module.exports = {
  context: __dirname,
  entry: [
    './app/index.jsx'
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  sassLoader: {
    includePaths: [ path.resolve(__dirname, './node_modules') ]
  },
  devtool: 'source-map',
  output: {
    publcPath: '/assets/',
    path: path.join(__dirname, './public/assets'),
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx|es6)$/,
        query: {
          presets: [ 'es2015', 'stage-0', 'react' ]
        }
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(gif|jpe?g|png)/,
        loader: 'url?limit=1000&mimetype=image/gif'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      }
    ]
  }
};

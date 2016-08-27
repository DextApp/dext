const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    index: [
      'babel-polyfill',
      path.resolve(__dirname, 'app', 'renderer', 'src', 'index'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'app', 'renderer', 'lib'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: ['json'],
      },
    ],
  },
  target: 'electron',
};

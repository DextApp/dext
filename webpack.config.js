const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, 'app/renderer/src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'app/renderer/lib'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['json-loader'],
      },
    ],
  },
  target: 'electron-renderer',
};

module.exports = config;

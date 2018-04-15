const webpack = require('webpack');
const deepAssign = require('deep-assign');
const baseConfig = require('./webpack.config');

const devConfig = deepAssign({}, baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
});

module.exports = devConfig;

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

const devConfig = merge({}, baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
});

module.exports = devConfig;

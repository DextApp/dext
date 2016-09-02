const webpack = require('webpack');
const deepAssign = require('deep-assign');
const baseConfig = require('./webpack.config');

const prodConfig = deepAssign({}, baseConfig);

// no devtool
prodConfig.devtool = null;

// merge plugins
prodConfig.plugins = baseConfig.plugins || [];
prodConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
prodConfig.plugins.push(new webpack.optimize.DedupePlugin());
prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
}));

// add banner
prodConfig.plugins.push(new webpack.BannerPlugin(`
(c) Copyright 2016. Vu Tran
Website: https://github.com/vutran/dext/
Developer: Vu Tran <vu@vu-tran.com>
`));

module.exports = prodConfig;

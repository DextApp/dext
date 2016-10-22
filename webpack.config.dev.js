const webpack = require('webpack');
const deepAssign = require('deep-assign');
const baseConfig = require('./webpack.config');

const devConfig = deepAssign({}, baseConfig);

// source mapping
devConfig.devtool = 'cheap-module-source-map';

// apply plugins
devConfig.plugins = baseConfig.plugins || [];
devConfig.plugins.push(new webpack.LoaderOptionsPlugin({ debug: true }));

module.exports = devConfig;

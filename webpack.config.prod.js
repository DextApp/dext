const webpack = require('webpack');
const deepAssign = require('deep-assign');
const baseConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new webpack.BannerPlugin(`
    (c) Copyright 2018. Vu Tran
    Website: https://github.com/DextApp/dext/
    Developer: Vu Tran <vu@vu-tran.com>
  `),
];

const prodConfig = deepAssign({}, baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    minimize: true,
  },
  plugins,
});

module.exports = prodConfig;

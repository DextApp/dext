const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new webpack.BannerPlugin(`
    (c) Copyright 2018. Vu Tran
    Website: https://github.com/DextApp/dext/
    Developer: Vu Tran <vu@vu-tran.com>
  `),
];

const prodConfig = merge({}, baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: { warnings: false },
        },
      }),
    ],
    minimize: true,
  },
  plugins,
});

module.exports = prodConfig;

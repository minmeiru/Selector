const path = require('path');
const WC = require('webpack-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const env = devMode ? 'dev' : 'prod';

module.exports = new WC.Config().extend(`webpack.${env}.config.js`).merge({
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: './src/index',
  output: {
    filename: 'ik-tree-select.min.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'IkTreeSelect',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        }],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // development 模式使用 style-loader，因为可以支持 HMR
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  }
});
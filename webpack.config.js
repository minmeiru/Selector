const path = require('path');
const WC = require('webpack-config');

const devMode = process.env.NODE_ENV !== 'production';
const env = devMode ? 'dev' : 'prod';

module.exports = new WC.Config().extend(`webpack.${env}.config.js`).merge({
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: './src/index',
  output: {
    filename: 'ik-tree-panel.min.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'IkTreePanelFilter',
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  }
});
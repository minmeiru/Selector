const webpack = require('webpack');
const WC = require('webpack-config');

module.exports = new WC.Config().merge({
  // devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: true,
    },
    host: 'localhost',
    port: 4000,
    hot: true,
  },
});
const WC = require('webpack-config');
const ParallelUglify = require('webpack-parallel-uglify-plugin');

module.exports = new WC.Config().merge({
  plugins: [
    new ParallelUglify({
      uglifyJS: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
          drop_debugger:  true,
          drop_console:  true
        },
      },
    }),
  ],
});
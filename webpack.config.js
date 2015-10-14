var path = require('path');
var webpack = require('webpack');

module.exports = {
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    // The dev server does not write files to disc, all in memory
    path: path.join(__dirname, 'dist'),
    // These two will form URL to request the bundle
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    // Three lines below are needed for https://www.npmjs.com/package/webpack-hot-middleware
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};

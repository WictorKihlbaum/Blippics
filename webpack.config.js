var webpack = require('webpack');

module.exports = {
  entry: './public/javascripts/index.js',
  plugins: [new webpack.optimize.UglifyJsPlugin()],
  externals: {
    jquery: 'jQuery'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg)$/,
      loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: /node_modules/
    }]
  },
  output: {
    path: './public/builds',
    filename: 'bundle.min.js',
  }
};
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve('./', 'index.js')
  },
  output: {
		path: '/',
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css/,
      use: ['style-loader','css-loader']
    }]
  }
}
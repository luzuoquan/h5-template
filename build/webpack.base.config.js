const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const env = process.env.NODE_ENV

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
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css/,
      use: ['style-loader','css-loader']
    }, {
      test: require.resolve("../src/assets/lib/jquery-3.2.1.min.js"),
      use: "imports-loader?$=jquery"
    }, {
      test: require.resolve("../src/assets/lib/createjs.js"),
      use: "imports-loader?this=>window"
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/',
          outputPath: 'static/images/'
        }
      }]
    }]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
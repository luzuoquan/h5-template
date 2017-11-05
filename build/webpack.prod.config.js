const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  output: {
		path: path.resolve(__dirname, '../dist/'),
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/[id].js'
	},
  devtool: "source-map",
	plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['app'],
        inject: true
    }),
  ]
})
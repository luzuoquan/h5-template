const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

Object.keys(baseWebpackConfig.entry).forEach(key => {
	baseWebpackConfig.entry[key] = [hotMiddlewareScript].concat(baseWebpackConfig.entry[key])
})

module.exports = merge(baseWebpackConfig, {
  devtool: "cheap-eval-source-map",
	plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new CopyWebpackPlugin([{
    //   from: 'src/assets/images/**/*',
    //   to: '[name].[ext]'
    // }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['app'],
        inject: true
    }),
  ]
})
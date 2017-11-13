const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: 'http://h5.pillele.cn/thanksgiving/',
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/[id].js'
	},
  devtool: "source-map",
	plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets/images/**/*',
      to: 'static/images/[name].[ext]'
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['app'],
        inject: true
    }),
  ]
})
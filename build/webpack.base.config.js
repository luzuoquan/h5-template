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
      exclude: /src\/assets\/lib\/*/,
      use: 'babel-loader'
    },{
      test: /\.css$/,
      // exclude: /node_modules/,
      use: ['style-loader','css-loader?importLoaders=1', 'postcss-loader']
    },
    {
      test: require.resolve("../src/assets/lib/jquery-3.2.1.min.js"),
      use: [{
          loader: 'imports-loader?$=jquery'
        }
        // ,{
        //   loader: 'expose-loader',
        //   options: '$'
        // }
      ]
    }, 
    // {
    //   test: require.resolve("../src/assets/lib/createjs.js"),
    //   use: "imports-loader?this=>window"
    // }, 
    {
      test: require.resolve("../src/assets/lib/jweixin-1.2.0.js"),
      use: "imports-loader?this=>window,define=>false"
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
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ]
}
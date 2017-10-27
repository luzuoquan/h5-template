const Koa = require('koa')
const Webpack = require('webpack')
const koaWebpack = require('koa-webpack')
const historyFallback = require('koa2-history-api-fallback')
const devWebpackConf = require('./webpack.dev.config')

const app = new Koa()
const compiler = Webpack(devWebpackConf)
const webpackMiddleware = koaWebpack({
	compiler: compiler,
	dev: {
		hot: true,
		noInfo: true,
		publicPath: '/',
		stats: {
			colors: true
		}
	}
})

app.use(historyFallback())
app.use(webpackMiddleware)

app.listen(3001)


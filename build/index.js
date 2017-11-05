const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.config')
var rm = require('rimraf')
var outputPath = webpackConfig.output.path

new Promise(function (resolve, reject) {
	rm(outputPath, function (err) {
		if (err) {
			console.log('删除目录: ' + outputPath + ' 失败')
			reject(err)
		} else {
			console.log('删除目录: ' + outputPath + ' 成功')
			resolve()
		}
	})
}).then(function () {
	webpack(webpackConfig, function (err, stats) {
		if (err) throw err
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n')
	})
}).catch(err => {
	console.log(err)
})
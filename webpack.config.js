let path = require("path"),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

let testB = path.resolve(__dirname, "src/js/entry");

module.exports = {
	entry:{
		firework: "./resource/js/entry/firework"
	},
	// entry: "./resource/js/entry/firework",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "src/js/entry"),
		libraryTarget: "umd",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				"test": /\.(es6|js)$/,
				exclude: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "node_modules"),
				],
				loader: "babel-loader",
			},
			{
				test: /\.(less|css)$/,
				exclude: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "node_modules"),
				],
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "less-loader",
						options: {
							strictMath: true,
							noIeCompat: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name]_[id].css",
		}),
	]
};
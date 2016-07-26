var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');


module.exports = {
	context: __dirname + "/../src",
	entry: "./app.jsx",

	output: {
		filename: "../js/app.js",
		path: __dirname + "/../www/"
	},

	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loaders: ['babel-loader'],
			},

			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},

			{
					test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
					loader: 'url-loader'
			}
		],
		postLoaders: [
			{ loader: "transform?brfs" }
		]
	},
	plugins: [
		new ExtractTextPlugin("../css/style.css")
	]
}

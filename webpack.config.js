/**
 * Webpack 4 configuration file
 * see https://webpack.js.org/configuration/
 * see https://webpack.js.org/configuration/dev-server/
 * ©2019 - AFE-GmdG
 */

"use strict";
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const process = require("process");
const autoprefixer = require("autoprefixer");

const cwd = process.cwd();

module.exports = (env) => [{
	name: "Examples",

	mode: "none", //disable default behavior

	target: "web",

	context: path.resolve(cwd, "examples"),

	entry: {
		examples: "./index.tsx"
	},

	devtool: env === "release" ? false : "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},

	output: {
		filename: "[name].js",
		path: path.resolve(cwd, "example-dist"),
		publicPath: ""
	},

	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: "babel-loader",
				options: {
					highlightCode: true,
					extends: path.resolve(cwd, ".babelrc")
				}
			}, {
				loader: "ts-loader"
			}]
		}, {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: "babel-loader",
				options: {
					highlightCode: true,
					extends: path.resolve(cwd, ".babelrc")
				}
			}]
		}, {
			test: /\.(png|jpe?g|gif|svg)$/,
			exclude: /node_modules/,
			use: [{
				loader: "url-loader",
				options: {
					limit: 128,
					name: "Resources/[name].[ext]"
				}
			}]
		}, {
			test: /\.less$/,
			exclude: /node_modules/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "typings-for-css-modules-loader",
				options: {
					modules: true,
					namedExport: true,
					localIdentName: env === "release" ? "[hash:base64:4]" : "[name]-[local]"
				}
			}, {
				loader: "postcss-loader",
				options: {
					plugins: () => [autoprefixer]
				}
			}, {
				loader: "less-loader"
			}]
		}, {
			test: /\.css$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "typings-for-css-modules-loader",
				options: {
					modules: true,
					namedExport: true,
					localIdentName: env === "release" ? "[hash:base64:4]" : "[name]-[local]"
				}
			}, {
				loader: "postcss-loader",
				options: {
					plugins: () => [autoprefixer]
				}
			}]
		}]
	},

	optimization: {
		noEmitOnErrors: true,
		namedModules: env !== "release",
		minimize: env === "release",
		minimizer: [new TerserPlugin({
			terserOptions: { // https://github.com/terser-js/terser#minify-options
				ecma: 7,
				warnings: false, // false, true, "verbose"
				parse: { // https://github.com/terser-js/terser#parse-options
					bare_returns: true,
					ecma: 8,
					shebang: false
				},
				compress: { // https://github.com/terser-js/terser#compress-options
					drop_console: true,
					drop_debugger: true,
					ecma: 7,
					keep_fargs: false, // set to true, if Function.length is used
					keep_infinity: true,
					passes: 1, // Keep in mind more passes will take more time.
					toplevel: true,
					unsafe_arrows: true,
					unsafe_math: true, // optimize numerical expressions like 2 * x * 3 into 6 * x, which may give imprecise floating point results.
					unsafe_methods: true,
					unsafe_proto: true, // optimize expressions like Array.prototype.slice.call(a) into [].slice.call(a)
					unsafe_undefined: true
				},
				mangle: true, // https://github.com/terser-js/terser#mangle-options
				module: false,
				output: {
					beautify: false,
					comments: false, // false, true, "some", regex
					ecma: 7
				}
			}
		})]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: "body",
			chunks: ['examples'],
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		...(env === "release") ? [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: "'production'",
					VERSION: JSON.stringify(require("./package.json").version)
				}
			})
		] : [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: "'development'",
					VERSION: JSON.stringify(require("./package.json").version)
				},
				"__REACT_DEVTOOLS_GLOBAL_HOOK__": `({
					supportsFiber: true,
					inject: function () { },
					onCommitFiberRoot: function () { },
					onCommitFiberUnmount: function () { },
				})`
			})
		],
		new webpack.WatchIgnorePlugin([
			/css\.d\.ts$/,
			/less\.d\.ts$/
		])
	],

	devServer: {
		public: "http://localhost:8080",
		contentBase: path.resolve(cwd, "example-dist"),
		compress: true,
		port: 8080,
		historyApiFallback: false,
		inline: true,
		hot: false,
		quiet: false,
		stats: {
			colors: true
		}
	}

}];

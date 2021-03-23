/**
  * Webpack 5 configuration file (custom React-App-Version)
  * see https://webpack.js.org/configuration/
  * see https://webpack.js.org/configuration/dev-server/
  * ©2019, 2020, 2021 - Andreas Friedel
  */

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const process = require("process");

const cwd = process.cwd();

const config = {
  name: "RCC Example Explorer",

  target: "web",

  context: path.resolve(cwd, "src"),

  entry: {
    app: ["./app.tsx"],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(cwd, "dist"),
    publicPath: "",
    globalObject: "self",
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: "ts-loader",
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: "style-loader",
      }, {
        loader: "css-loader",
        options: {
          url: (url, _resourcePath) => {
            if (url.includes(".ttf")) {
              return false;
            }
            return true;
          },
        },
      }],
    }, {
      test: /\.(png|jpe?g|gif)$/,
      exclude: /node_modules/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      }],
    }, {
      test: /favicon\.ico$/,
      exclude: /node_modules/,
      use: [{
        loader: "file-loader",
        options: {
          name: "favicon.ico",
        },
      }],
    }],
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 4194304,
    maxAssetSize: 4194304,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(cwd, "src/assets"),
        to: path.resolve(cwd, "dist/assets"),
        globOptions: {
          ignore: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg", "**/*.json"],
        },
      }],
    }),
    new HtmlWebpackPlugin({
      baseUrl: "/",
      filename: "index.html",
      template: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};

module.exports = (_env, argv) => {
  if (argv && argv.mode === "development") {
    return {
      ...config,

      devtool: "source-map",

      optimization: {
        emitOnErrors: false,
        minimize: false,
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            named: {
              test: /[\\/]node_modules[\\/]/,
              name() {
                return "vendor";
              },
            },
          },
        },
      },

      plugins: [
        ...config.plugins,

        new webpack.DefinePlugin({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "process.env.NODE_ENV": JSON.stringify("development"),
          // eslint-disable-next-line global-require
          "process.env.VERSION": JSON.stringify(require("./package.json").version),
        }),
      ],

      devServer: {
        writeToDisk: false,
        historyApiFallback: true,
        public: "http://localhost:3000",
        disableHostCheck: true,
        port: 3000,
        contentBase: path.resolve(cwd, "dist"),
        compress: true,
        headers: {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
        host: "localhost",
        inline: true,
        hot: false,
        quiet: false,
        stats: {
          colors: true,
        },
      },
    };
  }

  return {
    ...config,

    devtool: false,

    optimization: {
      emitOnErrors: false,
      minimize: true,
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          named: {
            test: /[\\/]node_modules[\\/]/,
            name() {
              return "vendor";
            },
          },
        },
      },
    },

    plugins: [
      ...config.plugins,

      new webpack.DefinePlugin({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env.NODE_ENV": JSON.stringify("production"),
        // eslint-disable-next-line global-require
        "process.env.VERSION": JSON.stringify(require("./package.json").version),
      }),
    ],
  };
};

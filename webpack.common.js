const path = require("path")
const webpack = require("webpack")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const config = require("./build.json")
const useSourceMaps = config.useSourceMaps

module.exports = {
  entry: path.resolve(__dirname, "script/init.js"),
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "script"),
        exclude: /node_modules/,
        loaders: ["babel-loader?cacheDirectory"]
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: useSourceMaps
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: useSourceMaps
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "style/sass")],
              sourceMap: useSourceMaps,
              outputStyle: "compressed"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: "raw-loader"
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "script"),
      "node_modules"
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      template: "./index.html",
      filename: "index.html"
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /sk/),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
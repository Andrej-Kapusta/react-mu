const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: ".",
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    overlay: {
      warnings: true,
      errors: true
    }
  }
})
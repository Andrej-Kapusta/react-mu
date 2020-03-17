const webpack = require("webpack")
const merge = require("webpack-merge")
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const common = require("./webpack.common.js")
const config = require("./build.json")

const useSourceMaps = config.useSourceMaps

module.exports = merge(common, {
  mode: "production",
  devtool: useSourceMaps ? "source-map" : false,
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(.*)$/,
      // threshold: 10240,
      minRatio: 0.8,
      exclude: /index\.html/
    }),
    // new BundleAnalyzerPlugin()
  ]
})
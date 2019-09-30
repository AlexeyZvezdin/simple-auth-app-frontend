const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config.js");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true
  },
  devtool: "cheap-eval-source-map",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});

module.exports = new Promise((res, rej) => {
  res(devWebpackConfig);
});

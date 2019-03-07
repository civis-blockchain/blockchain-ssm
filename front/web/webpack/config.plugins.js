const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { APP_ROOT } = require("./constants");

module.exports = () => [
  new WebpackCleanupPlugin({ quiet: true }),
  new HtmlWebpackPlugin({
    template: `${APP_ROOT}/src/index.html`,
    inject: true,
    filename: "index.html"
  })
];

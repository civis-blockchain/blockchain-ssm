const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { APP_ROOT } = require("./constants");
const pkg = require("../package.json");

module.exports = () => [
  new WebpackCleanupPlugin({ quiet: true }),
  new HtmlWebpackPlugin({
    template: `${APP_ROOT}/src/index.ejs`,
    inject: false,
    filename: "index.html",
    version: pkg.version
  })
];

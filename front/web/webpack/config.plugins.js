const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { APP_ROOT } = require("./constants");
const pkg = require("../package.json");
const webpack = require("webpack");

module.exports = () => [
  new WebpackCleanupPlugin({ quiet: true }),
  new HtmlWebpackPlugin({
    template: `${APP_ROOT}/src/index.ejs`,
    inject: false,
    filename: "index.html",
    version: pkg.version
  }),
  new webpack.DefinePlugin({'process.env.COOP_URL': `'${process.env.COOP_URL}'`})
];

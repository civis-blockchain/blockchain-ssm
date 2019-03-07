const path = require("path");

module.exports = [
  {
    test: /\.tsx?$/,
    loader: require.resolve("awesome-typescript-loader"),
    include: [path.join(__dirname, "..", "src")]
  },
  {
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader"
  }
];

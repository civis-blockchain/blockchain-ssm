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
  },
  {
    test: /\.css$/,
    loader: ["style-loader", "css-loader"]
  },
  {
    test: /\.woff2?$/,
    loader: "url-loader"
  },
  {
    test: /\.(png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  }
];

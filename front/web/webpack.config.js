const path = require("path");
const { APP_ROOT } = require("./webpack/constants");
const rules = require("./webpack/config.rules");
const basePlugins = require("./webpack/config.plugins.js");
const externals = require("./webpack/config.externals");
const devServer = require("./webpack/config.devServer");
const stats = require("./webpack/config.stats");
const dotenv = require("dotenv");

const result = dotenv.config({path: ".env"});
console.log(result.error);


module.exports = function webpack(env = {}, argv = {}) {
  const outputPath = path.resolve(APP_ROOT, "dist");

  return {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      modules: [path.join(__dirname, "src"), "node_modules"]
    },
    entry: "./src/index.tsx",
    output: {
      path: outputPath,
      filename: `ssm-front.[name].js`
    },
    module: { rules },
    externals: externals(env, argv),
    plugins: basePlugins(env, argv),
    devServer: devServer(env, outputPath),
    devtool: env.hmr ? "eval-source-map" : "source-map",
    stats
  };
};

const stats = require("./config.stats");

module.exports = env => ({
  host: "0.0.0.0",
  port: env.port || 1515,
  disableHostCheck: true,
  quiet: false,
  overlay: true,
  historyApiFallback: true,
  stats
});

module.exports = (env, argv) =>
  argv.mode === "production"
    ? {
        react: "React",
        "react-dom": "ReactDOM"
      }
    : {};

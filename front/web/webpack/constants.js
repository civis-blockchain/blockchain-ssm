const path = require("path");

const APP_ROOT = path.normalize(path.join(__dirname, ".."));

const constants = Object.freeze({
  APP_ROOT
});

module.exports = constants;

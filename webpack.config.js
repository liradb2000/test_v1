// const path = require("path");
module.exports = (config, env) => {
  config.entry.push("./src/index.js");
  config.output.publicPath = "http://localhost:3002/NEXIVIL/test-extension/";
  // config.output.publicPath = "/pkg/file/test2/test2/build/";
  return config;
};

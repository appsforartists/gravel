// The package globals get exported first so they may be imported
// during initialization by the components that need them.

module.exports = {
  "TOUCH_TARGET_MINIMUM_SIZE":  48,
  "STATIC_PATH":                __dirname + "/static/",
};

module.exports["colors"]          = require("./colors");
module.exports["components"]      = require("./components");
module.exports["styles"]          = require("./styles");


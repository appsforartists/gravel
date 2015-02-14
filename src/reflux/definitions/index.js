var Lazy = require("lazy.js");

module.exports = Lazy(
  [
    "LeftDrawerIsOpen",
    "RightDrawerIsOpen",
  ]
).map(
  key => [key, require(`./${ key }`)]
).toObject();

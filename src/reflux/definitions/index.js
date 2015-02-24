var Immutable = require("immutable");

module.exports = Immutable.List(
  [
    "LeftDrawerIsOpen",
    "RightDrawerIsOpen",
  ]
).toMap().mapEntries(
  ([i, name], _) => [name, require(`./${ name }`)]
).toObject();

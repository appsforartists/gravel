var packageGlobals = require("cascadia-generic");

var createText = require("./_createText");

var ListItemText = createText(
  {
    "styles":   {
                  "fontSize":                     14,
                  "fontWeight":                   500,
                  "opacity":                      .87,
                  "lineHeight":                   packageGlobals.TOUCH_TARGET_MINIMUM_SIZE + "px",
                },

    "truncate": false
  }
);

module.exports = ListItemText;

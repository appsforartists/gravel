var packageGlobals = require("gravel");

var createText = require("./_createText");

var ListItemText = createText(
  {
    "displayName":  "ListItemText",

    "styles":       {
                      "fontSize":                     14,
                      "fontWeight":                   500,
                      "opacity":                      .87,
                      "lineHeight":                   packageGlobals.TOUCH_TARGET_MINIMUM_SIZE + "px",
                    },

    "truncate":     false
  }
);

module.exports = ListItemText;

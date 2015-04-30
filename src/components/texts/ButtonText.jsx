var createText = require("./_createText");
var packageGlobals = require("gravel");

var ButtonText = createText(
  {
    "displayName":  "ButtonText",
    
    "styles":       {
                      "fontSize":                     14,
                      "fontWeight":                   500,
                      "opacity":                      .87,
                      "textTransform":                "uppercase",

                      "display":                      "inline-block",
                      "minHeight":                    packageGlobals.TOUCH_TARGET_MINIMUM_SIZE,

                      "paddingLeft":                  12,
                      "paddingRight":                 12,
                      "paddingTop":                   14,
                      "paddingBottom":                14,

                      "cursor":                       "pointer",
                    },

    "truncate":     true
  }
);

module.exports = ButtonText;

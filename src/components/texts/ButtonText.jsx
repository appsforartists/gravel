var createText = require("./_createText");
var packageGlobals = require("gravel");

var paddingX = 12;
var paddingY = 14;

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

                      "lineHeight":                   (packageGlobals.TOUCH_TARGET_MINIMUM_SIZE - 2 * paddingY) + "px",
                      "paddingLeft":                  paddingX,
                      "paddingRight":                 paddingX,
                      "paddingTop":                   paddingY,
                      "paddingBottom":                paddingY,

                      "cursor":                       "pointer",
                    },

    "truncate":     true
  }
);

module.exports = ButtonText;

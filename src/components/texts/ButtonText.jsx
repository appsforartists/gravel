var createText = require("./_createText");

var ButtonText = createText(
  {
    "styles":   {
                  "fontSize":                     14,
                  "fontWeight":                   500,
                  "opacity":                      .87,
                  "textTransform":                "uppercase",

                  "display":                      "inline-block",
                  "minHeight":                    48,

                  "paddingLeft":                  12,
                  "paddingRight":                 12,
                  "paddingTop":                   14,
                  "paddingBottom":                14,

                  "cursor":                       "pointer",
                },

    "truncate": true
  }
);

module.exports = ButtonText;

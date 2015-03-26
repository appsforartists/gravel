var createText = require("./_createText");

var CaptionText = createText(
  {
    "displayName":  "CaptionText",

    "styles":       {
                      "fontSize":                     12,
                      "fontWeight":                   400,
                      "opacity":                      .54,
                    },

    "truncate":     true
  }
);

module.exports = CaptionText;

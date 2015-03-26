var createText = require("./_createText");

var HeadlineText = createText(
  {
    "displayName":  "HeadlineText",

    "styles":       {
                      "fontSize":                     24,
                      "fontWeight":                   400,
                      "opacity":                      .87,
                      "lineSpacing":                  32,
                    },

    "truncate":     false
  }
);

module.exports = HeadlineText;

var createText = require("./_createText");

var SubheadlineText = createText(
  {
    "displayName":  "SubheadlineText",

    "styles":       {
                      "fontSize":                     16,
                      "fontWeight":                   400,
                      "opacity":                      .87,
                      "lineSpacing":                  28,
                    },

    "truncate":     false
  }
);

module.exports = SubheadlineText;

var createText = require("./_createText");

var HeadlineText = createText(
  {
    "styles":   {
                  "fontSize":                     24,
                  "fontWeight":                   400,
                  "opacity":                      .87,
                  "lineSpacing":                  32,
                },

    "truncate": false
  }
);

module.exports = HeadlineText;

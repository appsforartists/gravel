var createText = require("./_createText");

var CaptionText = createText(
  {
    "styles":   {
                  "fontSize":                     12,
                  "fontWeight":                   400,
                  "opacity":                      .54,
                },

    "truncate": true
  }
);

module.exports = CaptionText;

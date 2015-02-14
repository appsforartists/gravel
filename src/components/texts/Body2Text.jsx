var createText = require("./_createText");

var Body2Text = createText(
  {
    "styles":   {
                  "fontSize":                     14,
                  "fontWeight":                   500,
                  "opacity":                      .87,
                  "lineSpacing":                  24,
                },

    "truncate": false
  }
);

module.exports = Body2Text;

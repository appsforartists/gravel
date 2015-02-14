var createText = require("./_createText");

var Display2Text = createText(
  {
    "styles":   {
                  "fontSize":                     45,
                  "fontWeight":                   400,
                  "opacity":                      .54,
                  "lineSpacing":                  48,
                },

    "truncate": false
  }
);

module.exports = Display2Text;

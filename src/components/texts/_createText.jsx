var React = require("react/addons");

var View = require("../View");

var createText = function (
  {
    displayName,
    styles, 
    truncate
  }
) {
  if (truncate) {
    styles = Object.assign(
      {},

      styles,

      {
        "whiteSpace":                   "nowrap",
        "textOverflow":                 "ellipsis",
        "overflow":                     "hidden",
      }
    );
  }


  return React.createClass(
    {
      "displayName":                displayName,

      "render":                     function () {
                                      return  <View
                                                style = { styles }
                                              >
                                                { this.props.children }
                                              </View>;
                                    }
    }
  );
}

module.exports = createText;

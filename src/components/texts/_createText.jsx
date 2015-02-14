var React = require("react/addons");

var View = require("../View");

var createText = function (
  {
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

var React = require("react");

var View = require("../View");

var createText = function (
  {
    displayName,
    styles, 
    truncate
  }
) {
  var truncatedStyles = Object.assign(
    {},

    styles,

    {
      "whiteSpace":                   "nowrap",
      "textOverflow":                 "ellipsis",
      "overflow":                     "hidden",
    }
  );

  var truncateArg = truncate;

  return React.createClass(
    {
      "displayName":                displayName,

      "render":                     function () {
                                      var useTruncatedStyles = this.props.truncate === undefined
                                        ? truncateArg
                                        : this.props.truncate;

                                      var {
                                        truncate,
                                        ...propsPassthrough
                                      } = this.props;

                                      return  <View
                                                { ...propsPassthrough }
                                                
                                                style = {
                                                          Object.assign(
                                                            {
                                                              "display":  "block",
                                                            },

                                                            useTruncatedStyles
                                                              ? truncatedStyles
                                                              : styles,

                                                            this.props.style
                                                          )
                                                        }
                                              />;
                                    }
    }
  );
}

module.exports = createText;

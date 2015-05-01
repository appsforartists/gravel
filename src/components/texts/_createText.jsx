var React = require("react/addons");

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

  return React.createClass(
    {
      "displayName":                displayName,

      "render":                     function () {
                                      var useTruncatedStyles = this.props.truncate === undefined
                                        ? truncate
                                        : this.props.truncate;

                                      var {
                                        truncate,
                                        ...propsPassthrough
                                      } = this.props;

                                      return  <View
                                                { ...propsPassthrough }
                                                
                                                style = {
                                                          Object.assign(
                                                            {},

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

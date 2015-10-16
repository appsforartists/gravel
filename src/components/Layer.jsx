var React       = require("react");

var autoprefixStyleProp = require("autoprefix-style-prop");

var easings = require("../styles/easings");
var View    = require("./View");

var Layer = React.createClass(
  {
    "propTypes":                  {
                                    "elevation":      React.PropTypes.number,
                                    "tagName":        React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "elevation":    0,
                                      "tagName":      "div",
                                    }
                                  },

    "render":                     function () {
                                    var {
                                      style,
                                      children,
                                      ...propsPassthrough
                                    } = this.props;

                                    return  <View
                                              tagName = { this.props.tagName } 
                                              style   = {
                                                          {
                                                            ...styles.common,
                                                            ...styles.forElevation[this.props.elevation],
                                                            ...style,
                                                          }
                                                        }
                                            >                                    
                                              { children }
                                            </View>;
                                  }
  }
);

Layer.getStylesBelowElevation = function (elevation) {
  return {
    "zIndex": styles.forElevation[elevation].zIndex - 1000
  }
};

Layer.getStylesAboveElevation = function (elevation) {
  if ([-1, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER].includes(elevation))
    elevation = styles.forElevation.length - 1;

  return {
    "zIndex": styles.forElevation[elevation].zIndex + 1000
  }
};

// Shadow values from https://www.google.com/design/spec/layout/layout-principles.html#layout-principles-dimensionality

var styles = {
  "common":         autoprefixStyleProp(
                      {
                        "transitionProperty":           "box-shadow",
                        "transitionDuration":           ".25s",
                      }
                    ),

  "forElevation":   [
                      {
                        "zIndex":     0
                      },

                      {
                        "zIndex":     10000,
                        "boxShadow":  "0px 1px 1.5px rgba(  0,   0,   0, .12), 0px 1px 1px   rgba(  0,   0,   0, .24)",
                      },

                      {
                        "zIndex":     20000,
                        "boxShadow":  "0px 3px 3px rgba(  0,   0,   0, .16), 0px 3px 3px rgba(  0,   0,   0, .23)",
                      },

                      {
                        "zIndex":     30000,
                        "boxShadow":  "0px 10px 10px rgba(  0,   0,   0, .19), 0px  6px  3px rgba(  0,   0,   0, .23)",
                      },

                      {
                        "zIndex":     40000,
                        "boxShadow":  "0px 14px 14px rgba(  0,   0,   0, .25), 0px 10px  5px rgba(  0,   0,   0, .22)",
                      },
                            
                      {
                        "zIndex":     50000,
                        "boxShadow":  "0px 19px 19px rgba(  0,   0,   0, .30), 0px 15px  6px rgba(  0,   0,   0, .22)",
                      },
                    ]
};

module.exports = Layer;

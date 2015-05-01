var React       = require("react/addons");

var Layer       = require("./Layer");
var ButtonText  = require("./texts/ButtonText");
var easings     = require("../styles/easings");

var Button = React.createClass(
  {
    "propTypes":                  {
                                    "label":              React.PropTypes.string.isRequired,
                                    "onTouchTap":         React.PropTypes.func.isRequired,

                                    "foregroundColor":    React.PropTypes.string,
                                    "backgroundColor":    React.PropTypes.string,
                                    "elevation":          React.PropTypes.number,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "foregroundColor":  "white",
                                      "backgroundColor":  "red",
                                      "elevation":        1,
                                      "tabIndex":         0,
                                    }
                                  },

    "render":                     function () {
                                    return  <Layer 
                                              elevation = { this.props.elevation } 
                                              style     = {
                                                            {
                                                              "color":            this.props.foregroundColor,
                                                              "backgroundColor":  this.props.backgroundColor,
                                                            }
                                                          }
                                            >
                                              <ButtonText
                                                onTouchTap  = { this.props.onTouchTap }
                                                onKeyPress  = { this.onKeyPress }
                                                tabIndex    = { this.props.tabIndex }
                                              >
                                                { this.props.label }
                                              </ButtonText>
                                            </Layer>;
                                  },

    "onKeyPress":                 function (event) {
                                    if (["Enter", " "].includes(event.key)) {
                                      this.props.onTouchTap(event);
                                    }
                                  },
  }
);

module.exports = Button;

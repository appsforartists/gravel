var React       = require("react/addons");

var Layer       = require("./Layer");
var ButtonText  = require("./texts/ButtonText");
var easings     = require("../styles/easings");

var Button = React.createClass(
  {
    "propTypes":                  {
                                    "label":              React.PropTypes.string.isRequired,
                                    "onTouchTap":         React.PropTypes.func.isRequired,

                                    "isSubmit":           React.PropTypes.bool,
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
                                      "isSubmit":         false,
                                    }
                                  },

    "render":                     function () {
                                    return  <Layer 
                                              elevation = { this.props.elevation } 
                                            >
                                              <ButtonText
                                                tagName     = "input"
                                                type        = {
                                                                this.props.isSubmit
                                                                  ? "submit"
                                                                  : "button"
                                                              }
                                                style       = {
                                                                {
                                                                  "color":            this.props.foregroundColor,
                                                                  "backgroundColor":  this.props.backgroundColor,
                                                                }
                                                              }
                                                value       = { this.props.label }
                                                onTouchTap  = { this.props.onTouchTap }
                                                tabIndex    = { this.props.tabIndex }
                                              />
                                            </Layer>;
                                  },
  }
);

module.exports = Button;

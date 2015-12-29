var React       = require("react");

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
                                    "enabled":            React.PropTypes.bool,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "foregroundColor":  "white",
                                      "backgroundColor":  "red",
                                      "elevation":        1,
                                      "tabIndex":         0,
                                      "isSubmit":         false,
                                      "enabled":          true,
                                    }
                                  },

    "getInitialState":            function () {
                                    return {
                                      "focused":          false
                                    }
                                  },

    "render":                     function () {
                                    var elevation = this.props.elevation;

                                    if (this.state.focused && this.props.enabled)
                                      elevation++;

                                    return  <Layer 
                                              elevation = { 
                                                            this.props.enabled
                                                              ? elevation
                                                              : 0 
                                                          } 
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
                                                                  "color":            this.props.enabled
                                                                                        ? this.props.foregroundColor
                                                                                        : "rgba(0, 0, 0, .26)",

                                                                  "backgroundColor":  this.props.enabled
                                                                                        ? this.props.backgroundColor
                                                                                        : "rgba(0, 0, 0, .12)",

                                                                                      // don't draw the browser's blue focus box, because Layer gives us shadows for free
                                                                  "outline":          "none",
                                                                }
                                                              }
                                                value       = { this.props.label }
                                                onTouchTap  = { 
                                                                () => {
                                                                  if (this.props.enabled)
                                                                    this.props.onTouchTap();
                                                                }
                                                              }
                                                onFocus     = { this.onFocus }
                                                onBlur      = { this.onBlur }
                                                tabIndex    = { this.props.tabIndex }                                                          
                                              />
                                            </Layer>;
                                  },

    "onFocus":                    function (event) {
                                    this.setState(
                                      {
                                        "focused":  true,
                                      }
                                    );

                                    if (this.props.onFocus)
                                      this.props.onFocus(event);
                                  },

    "onBlur":                     function (event) {
                                    this.setState(
                                      {
                                        "focused":  false,
                                      }
                                    );

                                    if (this.props.onBlur)
                                      this.props.onBlur(event);
                                  },
  }
);

module.exports = Button;

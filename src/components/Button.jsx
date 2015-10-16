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

    "getInitialState":            function () {
                                    return {
                                      "focused":          false
                                    }
                                  },

    "render":                     function () {
                                    var elevation = this.props.elevation;

                                    if (this.state.focused)
                                      elevation++;

                                    return  <Layer 
                                              elevation = { elevation } 
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

                                                                                      // don't draw the browser's blue focus box, because Layer gives us shadows for free
                                                                  "outline":          "none",
                                                                }
                                                              }
                                                value       = { this.props.label }
                                                onTouchTap  = { this.props.onTouchTap }
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

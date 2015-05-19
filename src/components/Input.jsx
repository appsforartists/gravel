var React       = require("react/addons");

var autoprefixStyleProp = require("autoprefix-style-prop");

var easings     = require("../styles/easings");

var Input = React.createClass(
  {
    "propTypes":                  {
                                    "label":            React.PropTypes.string.isRequired,
                                    "onChange":         React.PropTypes.func.isRequired,
                                    "onFocus":          React.PropTypes.func,
                                    "onBlur":           React.PropTypes.func,
                                    
                                    "focusColor":       React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "focusColor":     "red",
                                    }
                                  },

    "getInitialState":            function () {
                                    return {
                                              // Need a better way to make unique IDs that won't break isomorphic checksums
                                      "id":   this.props.label + Math.random().toString().substr(1)
                                    }
                                  },

    "componentDidMount":          function () {
                                    // Detect autofill
                                    this.updateStateFromDOM();
                                  },

    "render":                     function () {
                                    var {
                                      ...propsPassthrough
                                    } = this.props;

                                    return  <div
                                              style = { styles.container }
                                            >
                                              <label
                                                htmlFor = { this.state.id }
                                                style   = {
                                                            {
                                                              ...styles.label.common,

                                                              ...(
                                                                this.state.active 
                                                                  ? styles.label.active
                                                                  : styles.label.inactive
                                                              ),

                                                              ...(
                                                                this.state.focused
                                                                  ? {
                                                                      "color":    this.props.focusColor
                                                                    }
                                                                  : null
                                                              )
                                                            }
                                                          }
                                              >
                                                { this.props.label }
                                              </label>

                                              <input 
                                                { ...propsPassthrough }
                                                
                                                id      = { this.state.id }
                                                ref     = "input"

                                                style   = {
                                                            {
                                                              ...styles.input.common,

                                                              ...(
                                                                this.state.focused 
                                                                  ? {
                                                                      ...styles.input.focused,

                                                                      "borderColor":    this.props.focusColor,
                                                                    }
                                                                  : styles.input.unfocused
                                                              ),
                                                            }
                                                          }

                                                onChange = { this.onChange }
                                                onFocus  = { this.onFocus }
                                                onBlur   = { this.onBlur }
                                              />
                                            </div>;
                                  },

    "onFocus":                    function (event) {
                                    this.setState(
                                      {
                                        "active":   true,
                                        "focused":  true,
                                      }
                                    );

                                    if (this.props.onFocus)
                                      this.props.onFocus(event);
                                  },

    "onBlur":                     function (event) {
                                    this.setState(
                                      {
                                        "active":   Boolean(this.state.value && this.state.value.trim()),
                                        "focused":  false,
                                      }
                                    );

                                    if (this.props.onBlur)
                                      this.props.onBlur(event);
                                  },

    "onChange":                   function (event) {
                                    this.updateStateFromDOM();

                                    this.props.onChange(event);
                                  },

    "updateStateFromDOM":         function () {
                                    var value = this.refs.input.getDOMNode().value;

                                    this.setState(
                                      {
                                        "value":    value,
                                        "active":   Boolean(value && value.trim())
                                      }
                                    );
                                  },
  }
);

Input.TRANSITION_DURATION = ".5s";
Input.PADDING             = 16;

var styles = {
  "container":  autoprefixStyleProp(
                  {
                    "position":                     "relative",
                    "height":                       "4.5em", // 72px at fontSize == 16
                    "justifyContent":               "flex-end",
                  }
                ),

  "label":      {
                  "common":   autoprefixStyleProp(
                                {
                                  "position":                     "absolute",
                                  "left":                         0,
                                  "bottom":                       Input.PADDING,
                                  "display":                      "inline-block",

                                  "fontSize":                     "1em",
                                  "textAlign":                    "left",
                                  "verticalAlign":                "bottom",

                                  "transformOrigin":              "0px 0px",
                                  "transitionProperty":           "transform opacity",
                                  "transitionDuration":           Input.TRANSITION_DURATION,
                                  
                                  ...easings.fallAndRecoil,
                                }
                              ),

                  "inactive": autoprefixStyleProp(
                                {
                                  "opacity":                      .4,
                                  "transform":                    `translateY(0em) scale(1)`,
                                }
                              ),

                  "active":   autoprefixStyleProp(
                                {
                                  "transform":                    `translateY(-1em) scale(${ 12/16 })`,
                                  "opacity":                      1,
                                }
                              ),
                },

  "input":      {
                  "common":     autoprefixStyleProp(
                                  {
                                    "boxShadow":                    "none",
                                    "borderRadius":                 0,
                                    "outline":                      "none",
                                    "backgroundColor":              "transparent",
                                    "fontSize":                     "1em",
                                    "paddingBottom":                Input.PADDING / 2 - 1,
                                    "marginBottom":                 Input.PADDING / 2,
                                    
                                    "transitionProperty":           "border",
                                    "transitionDuration":           Input.TRANSITION_DURATION,
                                    
                                    ...easings.fallAndRecoil,
                                  }
                                ),

                  "unfocused":  {
                                  "borderBottom":                 "1px solid #EFEFEF",
                                },

                  "focused":    {
                                  "borderBottom":                 "2px solid",
                                },
                },
};

module.exports = Input;

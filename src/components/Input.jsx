var React       = require("react/addons");

var autoprefixStyleProp = require("autoprefix-style-prop");

var defaultColors = require("../colors").defaults;
var easings       = require("../styles/easings");

var Input = React.createClass(
  {
    "propTypes":                  {
                                    "label":            React.PropTypes.string.isRequired,
                                    "onChange":         React.PropTypes.func.isRequired,
                                    "onFocus":          React.PropTypes.func,
                                    "onBlur":           React.PropTypes.func,
                                    "focusable":        React.PropTypes.bool,
                                    
                                    "colors":           React.PropTypes.shape(
                                                          {
                                                            "LABEL":            React.PropTypes.string,
                                                            "FOCUS":            React.PropTypes.string,
                                                            "ERROR":            React.PropTypes.string,
                                                            "INPUT_STROKE":     React.PropTypes.string,
                                                            "DISABLED_STROKE":  React.PropTypes.string,
                                                          }
                                                        ),
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "focusable":  true,
                                      "colors":     defaultColors,
                                    }
                                  },

    "getInitialState":            function () {
                                    return {
                                                  // Need a better way to make unique IDs that won't break isomorphic checksums
                                      "id":       this.props.label + Math.random().toString().substr(1),
                                      "focused":  false
                                    }
                                  },

    "componentWillMount":         function () {
                                    this.updateStateFromProps(this.props);
                                  },

    "componentDidMount":          function () {
                                    // Detect autofill
                                    this.updateStateFromDOM();

                                    // try again shortly in case the autofill didn't happen right away
                                    setTimeout(
                                      this.updateStateFromDOM,
                                      400
                                    );
                                  },

    "componentWillReceiveProps":  function (nextProps) {
                                    this.updateStateFromProps(nextProps);
                                  },

    "render":                     function () {
                                    var animable = this.props.focusable && !this.props.readOnly;
                                    var {
                                      style,
                                      ...propsPassthrough
                                    } = this.props;

                                    return  <div
                                              style = { 
                                                        {
                                                          ...styles.container,
                                                          ...style,
                                                        }
                                                      }
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
                                                                      "color":    this.props.colors["FOCUS"],
                                                                    }
                                                                  : {
                                                                      "color":    this.props.colors["LABEL"],
                                                                    }
                                                              ),

                                                              ...(
                                                                animable
                                                                  ? styles.label.animable
                                                                  : null
                                                              ),
                                                            }
                                                          }
                                              >
                                                { this.props.label }
                                              </label>

                                              <input 
                                                tabIndex  = {
                                                              this.props.focusable
                                                                ? 0
                                                                : -1
                                                            }
                                                
                                                { ...propsPassthrough }
                                                
                                                id        = { this.state.id }
                                                ref       = "input"

                                                style     = {
                                                              {
                                                                ...styles.input.common,

                                                                ...(
                                                                  this.props.readOnly
                                                                    ? {
                                                                        "borderBottom":    `1px dotted ${ this.props.colors["DISABLED_STROKE"] }`,
                                                                      }

                                                                    : this.state.focused 
                                                                      ? {
                                                                          "borderBottom":  `2px solid ${ this.props.colors["FOCUS"] }`,
                                                                        }

                                                                      : {
                                                                          "borderBottom":  `1px solid ${ this.props.colors["INPUT_STROKE"] }`,
                                                                        }
                                                                ),

                                                                ...(
                                                                  animable
                                                                    ? styles.input.animable
                                                                    : null
                                                                ),
                                                              }
                                                            }

                                                onChange  = { this.onChange }
                                                onFocus   = { this.onFocus }
                                                onBlur    = { this.onBlur }
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

                                    if (this.props.focusable || this.props.onChange)
                                      this.props.onChange(event);
                                  },

    "updateStateFromProps":       function (props) {
                                    var value = props.value;

                                    this.setState(
                                      {
                                        "value":    value,
                                        "active":   Boolean(value && value.trim())
                                      }
                                    );
                                  },
                                  
    "updateStateFromDOM":         function () {
                                    var node = this.refs.input && this.refs.input.getDOMNode();

                                    if (!node)
                                      return;
                                    
                                    var value = node.value;

                                    if (!value) {
                                      // For security reasons, we can't get an autofilled value from Chrome; 
                                      // however, we can check the `:-webkit-autofill` selector and infer
                                      // `active` accordingly.
                                      //
                                      // Firefox will let you read an autofilled value, so we don't need to sweat 
                                      // `:-moz-autofill`.

                                      var autofilled = false;

                                      // Must wrap these tests in a `try` because the browser will throw if it
                                      // doesn't recognize a selector
                                      try {
                                        autofilled = Boolean(node.parentNode.querySelector(":autofill"));

                                      } catch (error) {                                      
                                        try {
                                          autofilled = Boolean(node.parentNode.querySelector(":-webkit-autofill"));
                                          
                                        } catch (error) {}
                                      }  
                                    }

                                    this.setState(
                                      {
                                        "value":    value,
                                        "active":   this.state.focused || autofilled || Boolean(value && value.trim())
                                      }
                                    );
                                  },
  }
);

// We should probably be smarter about TRANSITION_DURATION, only using it when 
// transitioning between active and !active.  The current implementation
// transitions color on focus, even if the input is already active.  This makes
// the UI feel slow.
Input.TRANSITION_DURATION = ".5s";
Input.PADDING             = 8;

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
                                  "bottom":                       2 * Input.PADDING,
                                  "display":                      "inline-block",

                                  "fontSize":                     "1em",
                                  "textAlign":                    "left",
                                  "verticalAlign":                "bottom",
                                  
                                  "transformOrigin":              "0px 0px",
                                }
                              ),

                  "animable": autoprefixStyleProp(
                                {
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
                                {                                 // The Material docs specify a 12px font, but give it a 16px container
                                                                  // so subtract 2 extra pixels to center it in the box
                                  "transform":                    `translateY(-${ 1 + 2 / 16 }em) scale(${ 12 / 16 })`,
                                  "opacity":                      1,
                                }
                              ),
                },

  "input":      {
                  "common":     {
                                  "boxShadow":                    "none",
                                  "borderRadius":                 0,
                                  "outline":                      "none",
                                  "backgroundColor":              "transparent",
                                  "fontSize":                     "1em",
                                  "paddingBottom":                Input.PADDING - 1,
                                  "marginBottom":                 Input.PADDING,
                                },

                  "animable":   autoprefixStyleProp(
                                  {
                                    "transitionProperty":           "border",
                                    "transitionDuration":           Input.TRANSITION_DURATION,
                                    
                                    ...easings.fallAndRecoil,
                                  }
                                ),
                },
};

module.exports = Input;

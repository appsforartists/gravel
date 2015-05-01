var React       = require("react/addons");

var autoprefixStyleProp = require("autoprefix-style-prop");

var easings     = require("../styles/easings");

var Input = React.createClass(
  {
    "propTypes":                  {
                                    "label":            React.PropTypes.string.isRequired,
                                  },

    "getInitialState":            function () {
                                    return {
                                              // Need a better way to make unique IDs that won't break isomorphic checksums
                                      "id":   this.props.label + Math.random().toString().substr(1)
                                    }
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
                                                                  ? styles.input.focused
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
                                  },

    "onBlur":                     function (event) {
                                    this.setState(
                                      {
                                        "active":   Boolean(this.state.value && this.state.value.trim()),
                                        "focused":  false,
                                      }
                                    );
                                  },

    "onChange":                   function (event) {
                                    this.setState(
                                      {
                                        "value":    this.refs.input.getDOMNode().value
                                      }
                                    );
                                  },
  }
);

Input.TRANSITION_DURATION = ".5s";
Input.PADDING_BOTTOM      = 8;

var styles = {
  "container":  autoprefixStyleProp(
                  {
                    "position":                     "relative",
                    "height":                       "2.5em",
                    "justifyContent":               "flex-end",
                  }
                ),

  "label":      {
                  "common":   autoprefixStyleProp(
                                {
                                  "position":                     "absolute",
                                  "display":                      "inline-block",
                                  "height":                       "100%",

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
                                  "transform":                    `translateY(-${ Input.PADDING_BOTTOM - 4 }px) scale(1)`,
                                }
                              ),

                  "active":   autoprefixStyleProp(
                                {
                                  "transform":                    "translateY(-1em) scale(.5)",
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
                                    "paddingBottom":                Input.PADDING_BOTTOM,
                                    
                                    "transitionProperty":           "border",
                                    "transitionDuration":           Input.TRANSITION_DURATION,
                                    
                                    ...easings.fallAndRecoil,
                                  }
                                ),

                  "unfocused":  {
                                  "borderBottom":                 "1px solid #EFEFEF",
                                },

                  "focused":    {
                                  "borderBottom":                 "3px solid #000099",
                                },
                },
};

module.exports = Input;

var React               = require("react/addons");
var ImmutablePropTypes  = require("react-immutable-proptypes");

var autoprefixStyleProp = require("autoprefix-style-prop");

// For now, let's keep the UI consistent between Input and Menu
var Input               = require("./Input");

var defaultColors       = require("../colors").defaults;
var DisclosureTriangle  = require("./DisclosureTriangle");

var Menu = React.createClass(
  {
    "propTypes":                  {
                                    "label":            React.PropTypes.string,
                                    "options":          ImmutablePropTypes.list.isRequired,
                                    "initialOption":    ImmutablePropTypes.map,
                                    "style":            React.PropTypes.object,
                                    
                                    "onChange":         React.PropTypes.func.isRequired,
                                    "onFocus":          React.PropTypes.func,
                                    "onBlur":           React.PropTypes.func,

                                    "colors":           React.PropTypes.shape(
                                                          {
                                                            "FOCUS":            React.PropTypes.string,
                                                            "INPUT_STROKE":     React.PropTypes.string,
                                                          }
                                                        ),
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "colors":     defaultColors,
                                    }
                                  },

    "getInitialState":            function () {
                                    return {
                                      "focused":      false
                                    }
                                  },

    "componentWillMount":         function () {
                                    this.updateStateFromProps(this.props);
                                  },

    "componentWillReceiveProps":  function (nextProps) {
                                    this.updateStateFromProps(nextProps);
                                  },

    "updateStateFromProps":       function (props) {
                                    this.setState(
                                      {
                                        "selectedIndex":  props.options.indexOf(props.initialOption),
                                      }
                                    );
                                  },

    "render":                     function () {
                                    var inputColors = this.state.focused
                                      ? {
                                          ...this.props.colors,

                                          "LABEL":        this.props.colors["FOCUS"],
                                          "INPUT_STROKE": this.props.colors["FOCUS"],
                                        }
                                      : this.props.colors;

                                    return  <div 
                                              style = { 
                                                        {
                                                          ...styles.container,
                                                          ...this.props.style, 
                                                        }
                                                      }
                                            >
                                              {/* Draw the closed UI in DOM and use a hidden <select /> over the top
                                                  to draw the menu when open */}
                                              <select 
                                                style     = { styles.select }

                                                onChange  = { this.onChange }
                                                onFocus   = { this.onFocus }
                                                onBlur    = { this.onBlur }
                                              >
                                                {
                                                  this.props.options.map(
                                                    (option, i) =>  <option
                                                                      selected  = { this.state.selectedIndex === i }
                                                                      value     = { i }
                                                                    >
                                                                      { option.get("label") }
                                                                    </option>
                                                  )
                                                }
                                              </select>

                                              <Input
                                                label     = { this.props.label }
                                                value     = { this.state.selectedIndex !== -1
                                                                ? this.props.options.get(this.state.selectedIndex).get("label")
                                                                : ""
                                                            }
                                                focusable = { false }
                                                colors    = { inputColors }
                                              />

                                              <DisclosureTriangle 
                                                style = { 
                                                          {
                                                            ...(
                                                              this.state.focused
                                                                ? {
                                                                    "fill":   this.props.colors["FOCUS"]
                                                                  }

                                                                : {
                                                                    "fill":   this.props.colors["INPUT_STROKE"]
                                                                  }
                                                            ),
                                                            ...styles.triangle 
                                                          }
                                                        }
                                              />
                                            </div>;
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

   "onChange":                    function (event) {
                                    var selectedIndex = event.target.value;
                                    var selectedValue = this.props.options[selectedIndex];

                                    this.setState(
                                      {
                                        selectedIndex
                                      }
                                    );
                                    
                                    this.props.onChange(selectedValue);
                                  },
  }
);

var styles = {
  "container":  {
                  "position":                     "relative",
                },

  "select":     {
                  "position":                     "absolute",
                  "zIndex":                       1000,
                  "left":                         0,
                  "top":                          0,
                  "width":                        "100%",
                  "height":                       "100%",
                  "opacity":                      0,
                  "MozAppearance":                "none",
                  "WebkitAppearance":             "none",
                },

  "triangle":   {
                  "position":                     "absolute",
                  "zIndex":                       900,
                  "right":                        0,
                  "bottom":                       `calc(${ DisclosureTriangle.HEIGHT }px + 1em)`,
                },
};

module.exports = Menu;

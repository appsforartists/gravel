var Ambidex     = require("ambidex");
var Gravel      = require("gravel");
var React       = require("react/addons");
var autoprefixStyleProp = require("autoprefix-style-prop");

var Layer     = require("./Layer");
var Scrim     = require("./Scrim");

var {
  TitleText,
  Body1Text,
} = require("./texts");

var Dialog = React.createClass(
  {
    "mixins":                     [
                                    Ambidex.mixins.Nuclear,
                                    Ambidex.mixins.Title,
                                  ],

    "sectionTitle":               "Add",

    "propTypes":                  {
                                    "title":              React.PropTypes.string.isRequired,
                                    "content":            React.PropTypes.element.isRequired,
                                    "actionButtons":      React.PropTypes.array.isRequired,

                                    "elevation":          React.PropTypes.number,
                                    "backgroundColor":    React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "elevation":        3,
                                      "backgroundColor":  "white",
                                    }
                                  },

    "render":                     function () {
                                    return  <div style = { styles.container }>
                                              <Scrim 
                                                visible = { true }
                                              />
                                              <Layer 
                                                elevation = { this.props.elevation }
                                                style     = { 
                                                              {
                                                                "backgroundColor":  this.props.backgroundColor,

                                                                ...styles.layer 
                                                              }
                                                            }
                                              >
                                                <div style = { styles.body }>
                                                  <TitleText>
                                                    { this.props.title }
                                                  </TitleText>

                                                  <Body1Text
                                                    style = { styles.content }
                                                  >
                                                    { this.props.content }
                                                  </Body1Text>
                                                </div>

                                                <div style = { styles.actionButtons }>
                                                  { this.props.actionButtons }
                                                </div>
                                              </Layer>
                                            </div>;
                                  },

  }
);

var styles = {
  "container":      autoprefixStyleProp(
                      {
                        "display":                      "flex",
                        "flexDirection":                "row",
                        "justifyContent":               "center",
                        "alignItems":                   "center",
                        
                        "position":                     "fixed",
                        "top":                          0,
                        "left":                         0,
                        
                        "width":                        "100vw",
                        "height":                       "100vh",
                        
                        ...Layer.getStylesAboveElevation(-1),
                      }
                    ),

  "layer":          {
                      "maxWidth":                     "100vw",
                      "maxHeight":                    "100vh",
                      "overflow":                     "scroll",
                    },

  "body":           {
                      "margin":                       24,
                    },

  "content":        {
                      "marginTop":                    20,
                    },

  "actionButtons":  autoprefixStyleProp(
                      {
                        "display":                      "flex",
                        "flexWrap":                     "nowrap",
                        "flexDirection":                "row",
                        "justifyContent":               "flex-end",
                        "margin":                       8,
                      }
                    ),
};

module.exports = Dialog;

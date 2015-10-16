var React           = require("react");
var PureRenderMixin = require("react-pure-render/mixin");

var autoprefixStyleProp = require("autoprefix-style-prop");

var Layer = require("./Layer");

var backgroundColors = [
  "#E25F51",
  "#F26092",
  "#BB65CA",
  "#9572CF",
  "#7884CD",
  "#79A8FA",
  "#48C2F9",
  "#45D0E3",
  "#19A69A",
  "#2BAD6F",
  "#9BCD5F",
  "#D4E34A",
  "#F8CC3E",
  "#FFB840",
  "#FF8A60",
];

var PersonTile = React.createClass(
  {
    "mixins":                     [
                                    PureRenderMixin
                                  ],

    "propTypes":                  {
                                    "label":        React.PropTypes.string.isRequired,
                                    "image":        React.PropTypes.string,
                                    "elevation":    React.PropTypes.number,
                                    "style":        React.PropTypes.object,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "elevation":  1,
                                      "label":      "",
                                      "style":      {},
                                    }
                                  },

    "componentWillMount":         function () {
                                    this.recalculateBackgroundColor();
                                  },

    "componentWillUpdate":        function () {
                                    this.recalculateBackgroundColor();
                                  },

    "recalculateBackgroundColor": function () {
                                    this.setState(
                                      {
                                        "backgroundColor":    backgroundColors[(backgroundColors.length - 1) % this.props.label.length],
                                      }
                                    );
                                  },

    "render":                     function () {
                                    return  <li
                                              style = { 
                                                        {
                                                          ...styles.container,
                                                          ...this.props.style 
                                                        }
                                                      }
                                            >
                                              <Layer 
                                                elevation = { this.props.elevation } 
                                                style     = { styles.avatarContainer }
                                              >
                                                {
                                                  this.props.image
                                                    ? <img
                                                        src   = { this.props.image }
                                                        style = { styles.avatar }
                                                      />

                                                    : <div
                                                        style = {
                                                                  {
                                                                    "backgroundColor":  this.state.backgroundColor,

                                                                    ...styles.avatar
                                                                  }
                                                                }
                                                      >
                                                        { 
                                                          this.props.label
                                                            ? this.props.label[0].toUpperCase() 
                                                            : ""
                                                        }
                                                      </div>
                                                }
                                              </Layer>

                                              <div
                                                style = { styles.label }
                                              >
                                                { this.props.label }
                                              </div>
                                            </li>;
                                  }
  }
);

PersonTile.WIDTH = 160;

var styles = {
  "container":        autoprefixStyleProp(
                        {
                          "display":                      "flex",
                          "flexDirection":                "column",
                          "alignItems":                   "center",
                        }
                      ),
  "label":            autoprefixStyleProp(
                        {
                          "maxWidth":                     PersonTile.WIDTH,
                          "textAlign":                    "center",
                          "marginTop":                    "1em",
                          "marginBottom":                 "1em",
                        }
                      ),

  "avatarContainer":  autoprefixStyleProp(
                        {
                          "width":                        PersonTile.WIDTH,
                          "height":                       PersonTile.WIDTH,
                          "borderRadius":                 PersonTile.WIDTH / 2,
                          
                          "border":                       "4px solid white",
                          "color":                        "white",
                        }
                      ),

  "avatar":           autoprefixStyleProp(
                        {
                          "justifyContent":               "center",
                          "alignItems":                   "center",
                          
                          "width":                        "100%",
                          "height":                       "100%",
                          "borderRadius":                 "inherit",

                          "fontSize":                     70,
                          "fontWeight":                   300,
                        }
                      ),
};

module.exports = PersonTile;

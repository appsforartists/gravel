var React       = require("react/addons");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

var autoprefixStyleProp = require("autoprefix-style-prop");

var Layer      = require("./Layer");
var IconButton = require("./IconButton");
var Silhouette = require("./Silhouette");

var AppBar = React.createClass(
  {
    "propTypes":                  {
                                    "imagesURL":          React.PropTypes.string.isRequired,
                                    "logoSrc":            React.PropTypes.string.isRequired,
                                    "actionButtons":      React.PropTypes.element,
                                    "shouldShowNavIcon":  React.PropTypes.bool,
                                    "showNavAction":      React.PropTypes.func,
                                    "makeLogoSilhouette": React.PropTypes.bool,
                                    "style":              React.PropTypes.object,
                                    "foregroundColor":    React.PropTypes.string,
                                    "backgroundColor":    React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "makeLogoSilhouette": false
                                    }
                                  },

    "render":                     function () {
                                    var ImageClass = this.props.makeLogoSilhouette
                                      ? Silhouette
                                      : "img";

                                    return  <Layer 
                                              elevation = { 1 }
                                              tagName   = "nav"
                                              style     = { 
                                                            {
                                                              "backgroundColor":  this.props.backgroundColor || this.props.style.backgroundColor || "white",
                                                              
                                                              ...this.props.style,
                                                              ...styles.container,
                                                            }
                                                          }
                                            >
                                              { 
                                                this.props.shouldShowNavIcon 
                                                  ? <IconButton
                                                      src             = { this.props.imagesURL + "nav.svg" }
                                                      onTouchTap      = { event => this.props.showNavAction() }
                                                      makeSilhouette  = { true }

                                                      silhouetteColor = { this.props.foregroundColor }
                                                    />
                                                  : null
                                              }

                                              <Link to = "home">
                                                <ImageClass 
                                                  src   = { this.props.logoSrc } 
                                                  color = { this.props.foregroundColor }
                                                  style = { 
                                                            {
                                                              "marginLeft":                   this.props.shouldShowNavIcon
                                                                                                ? 0
                                                                                                : IconButton.PADDING,

                                                              ...styles.logo 
                                                            }
                                                          }
                                                />
                                              </Link>

                                              <div>
                                                { this.props.actionButtons }
                                              </div>
                                            </Layer>;
                                  }
  }
);

AppBar.HEIGHT  = 56;

var styles = {
  "container":      autoprefixStyleProp(
                      {
                        "flexDirection":                "row",
                        "justifyContent":               "space-between",
                        "alignItems":                   "center",

                        "position":                     "fixed",
                        "top":                          0,
                        "left":                         0,

                        "width":                        "100vw",
                        "height":                       AppBar.HEIGHT,
                      }
                    ),
                                        
  "logo":           autoprefixStyleProp(
                      {
                        "maxHeight":                    IconButton.visibleSize,
                        "maxWidth":                     `calc(100vw - ${ 2 * (IconButton.TOTAL_SIZE + IconButton.PADDING) }px)`,
                      }
                    ),
};

module.exports = AppBar;

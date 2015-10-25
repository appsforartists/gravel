var React       = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

var autoprefixStyleProp = require("autoprefix-style-prop");

var Layer      = require("./Layer");
var IconButton = require("./IconButton");
var Silhouette = require("./Silhouette");
var TitleText  = require("./texts/TitleText");

var AppBar = React.createClass(
  {
    "propTypes":                  {
                                    "imagesURL":          React.PropTypes.string,
                                    "title":              React.PropTypes.string.isRequired,
                                    "logoSrc":            React.PropTypes.string,
                                    "logoDestination":    React.PropTypes.string,
                                    "actionButtons":      React.PropTypes.element,
                                    "shouldShowNavIcon":  React.PropTypes.bool,
                                    "showNavAction":      React.PropTypes.func,
                                    "makeLogoSilhouette": React.PropTypes.bool,
                                    "forceCenterLogo":    React.PropTypes.bool,
                                    "style":              React.PropTypes.object,
                                    "foregroundColor":    React.PropTypes.string,
                                    "backgroundColor":    React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "logoDestination":    "home",
                                      "makeLogoSilhouette": false,
                                      "forceCenterLogo":    false,
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
                                                      style           = { styles.navIcon }
                                                      makeSilhouette  = { true }

                                                      silhouetteColor = { this.props.foregroundColor }
                                                    />
                                                  : this.props.forceCenterLogo
                                                    ? <span />
                                                    : null
                                              }

                                              {
                                                this.props.logoSrc
                                                  ? <Link to = { this.props.logoDestination }>
                                                      <ImageClass 
                                                        alt   = { this.props.title } 
                                                        src   = { this.props.logoSrc } 
                                                        color = { this.props.foregroundColor }
                                                        style = { 
                                                                  {
                                                                    "marginLeft":                   this.props.shouldShowNavIcon || this.props.forceCenterLogo
                                                                                                      ? 0
                                                                                                      : IconButton.PADDING,

                                                                    ...styles.logo 
                                                                  }
                                                                }
                                                      />
                                                    </Link>
                                                  : <TitleText
                                                      style = {
                                                                {
                                                                  "color": this.props.foregroundColor,

                                                                  ...styles.title
                                                                }
                                                              }
                                                    >
                                                      { this.props.title }
                                                    </TitleText>
                                              }

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
                                        
  "navIcon":        autoprefixStyleProp(
                      {
                        "left":                         4,
                      }
                    ),
                                        
  "logo":           autoprefixStyleProp(
                      {
                        "maxHeight":                    IconButton.visibleSize,
                        "maxWidth":                     `calc(100vw - ${ 2 * (IconButton.TOTAL_SIZE + IconButton.PADDING) }px)`,
                      }
                    ),
                                        
  "title":          autoprefixStyleProp(
                      {
                        "flexGrow":                     1,
                        "marginLeft":                   24, // Aligns title to 72px keyline, as per https://www.google.com/design/spec/layout/structure.html#structure-app-bar
                      }
                    ),
};

module.exports = AppBar;

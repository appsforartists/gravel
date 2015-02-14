var Ambidex     = require("ambidex");
var React       = require("react/addons");
var ReactRouter = require("react-router");

RouteHandler = ReactRouter.RouteHandler;

var AppBar = require("./AppBar");
var Drawer = require("./Drawer");

var Main = React.createClass(
  {
    "propTypes":                  {
                                    "staticURL":              React.PropTypes.string.isRequired,
                                    "logoSrc":                React.PropTypes.string.isRequired,
                                    
                                    "makeLogoSilhouette":     React.PropTypes.bool,
                                    "leftSideBar":            React.PropTypes.element,
                                    "rightSideBar":           React.PropTypes.element,

                                                              // I can't help wondering if this should be
                                                              // a list of props to pass to the IconButtons
                                    "appBarActionButtons":    React.PropTypes.element,
                                    "appBarForegroundColor":  React.PropTypes.string,
                                    "appBarBackgroundColor":  React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "appBarForegroundColor":  "black",
                                      "appBarBackgroundColor":  "white",
                                    }
                                  },

    "mixins":                     [
                                    Ambidex.mixinCreators.connectStoresToLocalState(
                                      [
                                        "LeftDrawerIsOpen",
                                        "RightDrawerIsOpen"
                                      ]
                                    ),
                                  ],

    "render":                     function () {
                                    // TODO: allow drawers to become sidebars on wide screens

                                    return  <div>
                                              <AppBar
                                                shouldShowNavIcon   = { Boolean(this.props.leftSideBar) }
                                                showNavAction       = { this.getRefluxAction("showLeftDrawer") }
                                                imagesURL           = { this.props.staticURL + "images/" }
                                                actionButtons       = { this.props.appBarActionButtons }
                                                logoSrc             = { this.props.logoSrc }
                                                makeLogoSilhouette  = { this.props.makeLogoSilhouette }
                                                foregroundColor     = { this.props.appBarForegroundColor }
                                                backgroundColor     = { this.props.appBarBackgroundColor }
                                              />

                                              {
                                                this.props.leftSideBar
                                                  ? <Drawer
                                                      side       = "left"
                                                      open       = { this.state.leftDrawerIsOpen }
                                                      hideAction = { this.getRefluxAction("hideLeftDrawer") }
                                                      content    = { this.props.leftSideBar }
                                                    />
                                                  : null 
                                              }

                                              <div style = { styles.content }>
                                                <RouteHandler />
                                              </div>

                                              {
                                                this.props.rightSideBar
                                                  ? <Drawer
                                                      side       = "right"
                                                      open       = { this.state.rightDrawerIsOpen }
                                                      hideAction = { this.getRefluxAction("hideRightDrawer") }
                                                      content    = { this.props.rightSideBar }
                                                    />
                                                  : null
                                              }
                                            </div>;
                                  }
  }
);

var styles = {
  "content":  {
                "marginTop":  AppBar.height + 4,
                "zIndex":     0,
              }
};

module.exports = Main;

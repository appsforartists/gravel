var Ambidex     = require("ambidex");
var React       = require("react/addons");
var ReactRouter = require("react-router");

var RouteHandler = ReactRouter.RouteHandler;

var AppBar = require("./AppBar");
var Drawer = require("./Drawer");

var Main = React.createClass(
  {
    "propTypes":                  {
                                    "staticURL":                    React.PropTypes.string.isRequired,
                                    "logoSrc":                      React.PropTypes.string.isRequired,
                                    
                                    "makeLogoSilhouette":           React.PropTypes.bool,
                                    "leftSideBar":                  React.PropTypes.element,
                                    "rightSideBar":                 React.PropTypes.element,

                                                                    // I can't help wondering if this should be
                                                                    // a list of props to pass to the IconButtons
                                    "appBarActionButtons":          React.PropTypes.element,


                                    "appBarForegroundColor":        React.PropTypes.string,
                                    "appBarBackgroundColor":        React.PropTypes.string,
                                    "leftSideBarBackgroundColor":   React.PropTypes.string,
                                    "rightSideBarBackgroundColor":  React.PropTypes.string,
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
                                        "leftDrawerIsOpen",
                                        "rightDrawerIsOpen"
                                      ]
                                    ),
                                  ],

    "render":                     function () {
                                    // TODO: allow drawers to become sidebars on wide screens

                                    return  <div style = { this.props.style }>
                                              <AppBar
                                                shouldShowNavIcon   = { Boolean(this.props.leftSideBar) }
                                                showNavAction       = { this.getFunxAction("showLeftDrawer") }
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
                                                      side            = "left"
                                                      open            = { this.state.leftDrawerIsOpen }
                                                      hideAction      = { this.getFunxAction("hideLeftDrawer") }
                                                      content         = { this.props.leftSideBar }
                                                      backgroundColor = { this.props.leftSideBarBackgroundColor }
                                                    />
                                                  : null 
                                              }

                                              <div style = { styles.content }>
                                                <RouteHandler />
                                              </div>

                                              {
                                                this.props.rightSideBar
                                                  ? <Drawer
                                                      side            = "right"
                                                      open            = { this.state.rightDrawerIsOpen }
                                                      hideAction      = { this.getFunxAction("hideRightDrawer") }
                                                      content         = { this.props.rightSideBar }
                                                      backgroundColor = { this.props.rightSideBarBackgroundColor }
                                                    />
                                                  : null
                                              }
                                            </div>;
                                  }
  }
);

var styles = {
  "content":  {
                "marginTop":  AppBar.HEIGHT + 4,
                "zIndex":     0,
              }
};

module.exports = Main;

var React = require("react");

var AppBar = require("./AppBar");
var Drawer = require("./Drawer");

var Main = React.createClass(
  {
    "propTypes":                  {
                                    "staticURL":                    React.PropTypes.string,
                                    "logoSrc":                      React.PropTypes.string,
                                    "logoDestination":              React.PropTypes.string,
                                    "appBarTitle":                  React.PropTypes.string.isRequired,
                                    
                                    "makeLogoSilhouette":           React.PropTypes.bool,
                                    "leftSideBar":                  React.PropTypes.element,
                                    "rightSideBar":                 React.PropTypes.element,

                                                                    // I can't help wondering if this should be
                                                                    // a list of props to pass to the IconButtons
                                    "appBarActionButtons":          React.PropTypes.element,
                                    "appBarForceCenterLogo":        React.PropTypes.bool,

                                    "appBarForegroundColor":        React.PropTypes.string,
                                    "appBarBackgroundColor":        React.PropTypes.string,
                                    "leftSideBarBackgroundColor":   React.PropTypes.string,
                                    "rightSideBarBackgroundColor":  React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "logoDestination":        "home",
                                      "appBarForceCenterLogo":  false,

                                      "appBarForegroundColor":  "black",
                                      "appBarBackgroundColor":  "white",
                                    }
                                  },

    "getInitialState":            function () {
                                    return {
                                      "leftDrawerIsOpen":       false,
                                      "rightDrawerIsOpen":      false,
                                    }
                                  },

    "showLeftDrawer":             function () {
                                    this.setState(
                                      {
                                        "leftDrawerIsOpen":     true,
                                      }
                                    );
                                  },

    "hideLeftDrawer":             function () {
                                    this.setState(
                                      {
                                        "leftDrawerIsOpen":     false,
                                      }
                                    );
                                  },

    "showRightDrawer":            function () {
                                    this.setState(
                                      {
                                        "rightDrawerIsOpen":   true,
                                      }
                                    );
                                  },

    "hideRightDrawer":            function () {
                                    this.setState(
                                      {
                                        "rightDrawerIsOpen":   false,
                                      }
                                    );
                                  },

    "render":                     function () {
                                    // TODO: allow drawers to become sidebars on wide screens

                                    return  <div style = { this.props.style }>
                                              <AppBar
                                                shouldShowNavIcon   = { Boolean(this.props.leftSideBar) }
                                                showNavAction       = { this.showLeftDrawer }
                                                imagesURL           = { this.props.staticURL + "images/" }
                                                actionButtons       = { this.props.appBarActionButtons }
                                                title               = { this.props.appBarTitle }
                                                logoSrc             = { this.props.logoSrc }
                                                logoDestination     = { this.props.logoDestination }
                                                forceCenterLogo     = { this.props.appBarForceCenterLogo }
                                                makeLogoSilhouette  = { this.props.makeLogoSilhouette }
                                                foregroundColor     = { this.props.appBarForegroundColor }
                                                backgroundColor     = { this.props.appBarBackgroundColor }
                                              />

                                              {
                                                this.props.leftSideBar
                                                  ? <Drawer
                                                      side            = "left"
                                                      open            = { this.state.leftDrawerIsOpen }
                                                      hideAction      = { this.hideLeftDrawer }
                                                      content         = { this.props.leftSideBar }
                                                      backgroundColor = { this.props.leftSideBarBackgroundColor }
                                                    />
                                                  : null 
                                              }

                                              <div style = { styles.content }>
                                                { this.props.children }
                                              </div>

                                              {
                                                this.props.rightSideBar
                                                  ? <Drawer
                                                      side            = "right"
                                                      open            = { this.state.rightDrawerIsOpen }
                                                      hideAction      = { this.hideRightDrawer }
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

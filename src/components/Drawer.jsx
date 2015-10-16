var React       = require("react");

var autoprefixStyleProp = require("autoprefix-style-prop");

var AppBar      = require("./AppBar");
var Layer       = require("./Layer");
var Scrim       = require("./Scrim");
var ScrollPane  = require("./ScrollPane");

var easings = require("../styles/easings");

var Drawer = React.createClass(
  {
    "shouldComponentUpdate":      function (nextProps, nextState) {
                                    return nextProps.open || this.props.open != nextProps.open;
                                  },

    "propTypes":                  {
                                    "side":                 React.PropTypes.oneOf(["left", "right"]).isRequired,
                                    "open":                 React.PropTypes.bool.isRequired,
                                    "hideAction":           React.PropTypes.func.isRequired,

                                    "backgroundColor":      React.PropTypes.string,
                                    "elevation":            React.PropTypes.number,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "side":               "left",
                                      "open":               false,

                                      "backgroundColor":    "white",
                                      "elevation":          2,
                                    }
                                  },                              

    "render":                     function () {
                                    // TODO: limit the drawer width to 400px
                                    //
                                    //       maybe there should be a service that returns
                                    //       a reflux store to switch on window width with
                                    //       matchMedia
                                    return  <div>
                                              <Scrim
                                                visible     = { this.props.open }

                                                style       = {
                                                                {
                                                                  ...styles.scrim,
                                                                  ...Layer.getStylesBelowElevation(this.props.elevation),
                                                                  ...easings.fallAndRecoil,
                                                                }
                                                              }

                                                onTouchTap  = {
                                                                event => {
                                                                  event.preventDefault();
                                                                  this.props.hideAction();
                                                                }
                                                              }
                                              />

                                              <Layer
                                                elevation = { this.props.elevation }
                                                style     = {
                                                              {
                                                                "backgroundColor":    this.props.backgroundColor,

                                                                ...(this.props.open && styles.drawer[this.props.side].open),

                                                                ...styles.drawer[this.props.side].common,
                                                                ...styles.drawer.common,
                                                                ...easings.fallAndRecoil,
                                                              }
                                                            }
                                              >
                                                <div 
                                                  style = {  
                                                            {
                                                              ...styles.bloomer.common,
                                                              ...styles.bloomer[this.props.side],
                                                            } 
                                                          }
                                                />

                                                <ScrollPane>
                                                  { this.props.content }
                                                </ScrollPane>
                                              </Layer>
                                            </div>;
                                  }
  }
);

Drawer.TRANSITION_DURATION = .6;

var bloomerWidth = "15vw";

var styles = {
  "scrim":    {
                "transitionProperty":           "opacity",
                "transitionDuration":           Drawer.TRANSITION_DURATION + "s",
                
                ...Layer.getStylesBelowElevation(2),
              },
  
  "drawer":   {
                "common": {
                            "transitionDuration":           Drawer.TRANSITION_DURATION + "s",
                            "transitionProperty":           "transform -webkit-transform",

                            "position":                     "fixed",
                            "top":                          0,

                            "height":                       "100vh",
                            "width":                        `calc(100vw - ${ AppBar.HEIGHT }px)`,
                          },
                            
                          /*  We want the right edge of the drawer to match the left
                           *  edge of the viewport (and vice-versa).  We do this by
                           *  telling the left drawer to be one viewport-width away
                           *  from the right edge of the screen.
                           */

                "left":   {
                            "common": autoprefixStyleProp(
                                        {
                                          "right":                        "100vw",
                                        }
                                      ),

                            "open":   autoprefixStyleProp(
                                        {
                                          "transform":                    `translateX(
                                                                            calc(
                                                                              100vw - ${ AppBar.HEIGHT }px
                                                                            )
                                                                          )`,
                                        }
                                      ),
                          },
                            
                "right":  {
                            "common": autoprefixStyleProp(
                                        {
                                          "left":                         "100vw",
                                        }
                                      ),

                            "open":   autoprefixStyleProp(
                                        {
                                          "transform":                    `translateX(
                                                                            calc(
                                                                              ${ AppBar.HEIGHT }px - 100vw
                                                                            )
                                                                          )`,
                                        }
                                      ),
                          },
              },

  "bloomer":  {
                /*  The background will peek through behind the drawer if we
                 *  use a tween with follow through.
                 *
                 *  A bloomer prevents that by covering the hole with an
                 *  extended background.
                 */
                 "common":  {
                              "position":                     "absolute",
                              "top":                          0,

                              "width":                        bloomerWidth,
                              "height":                       "100%",

                              "backgroundColor":              "inherit",
                            },

                 "left":    {
                              "left":                         `-${ bloomerWidth }`,
                            },

                 "right":   {
                              "right":                        `-${ bloomerWidth }`,
                            },
              },
}

module.exports = Drawer;

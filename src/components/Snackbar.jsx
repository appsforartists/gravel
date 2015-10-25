var React = require("react");

var {
  Motion,
  spring,
} = require("react-motion");

var Layer = require("./Layer");

var {
  Body1Text,
} = require("./texts");

var memoizeRounded = require("../helpers/memoizeRounded");

var Snackbar = (props) => <Motion
                            defaultStyle =  {
                                              {
                                                "y":  Snackbar.HEIGHT,
                                              }
                                            }
                            style =         {
                                              {
                                                "y":  props.open
                                                        ? spring(              0, [225, 16])
                                                        : spring(Snackbar.HEIGHT, [225, 16]),
                                              }
                                            }
                          >
                            {
                              memoizeRounded(
                                ({ y }) =>  <aside 
                                              style = { 
                                                        {
                                                          "transform":  `translateY(${ y }px)`,

                                                          ...styles.container,
                                                          ...props.style,
                                                        }
                                                      }
                                            >
                                              <Body1Text 
                                                style = { styles.label }
                                              >
                                                { props.content }
                                              </Body1Text> 

                                              { props.buttons }

                                              <div style = { styles.bloomer } />
                                            </aside>
                              )
                            }
                          </Motion>;

Snackbar.HEIGHT = 48;
Snackbar.BLOOMER_HEIGHT = Snackbar.HEIGHT / 2;

var styles = {
  "container":    {
                    "position":           "fixed",
                    "left":               0,
                    "bottom":             0,
                    "width":              "100vw",
                    "height":             Snackbar.HEIGHT,
                    "flexDirection":      "row",
                    "justifyContent":     "space-between",
                    "alignItems":         "center",
                    "paddingLeft":        24,
                    "paddingRight":       24,
                    "backgroundColor":    "#323232",

                    ...Layer.getStylesAboveElevation(1),
                  },

  "bloomer":      {
                    "position":           "absolute",
                    "height":             Snackbar.BLOOMER_HEIGHT,
                    "left":               0,
                    "bottom":             -Snackbar.BLOOMER_HEIGHT,
                    "width":              "100%",
                    "backgroundColor":    "inherit",
                  },

  "label":        {
                    "opacity":            1,
                    "color":              "#FFFFFF",
                  },
};

module.exports = Snackbar;
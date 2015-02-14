var React       = require("react/addons");

var Scrim = React.createClass(
  {
    "propTypes":                  {
                                    "visible":    React.PropTypes.bool.isRequired,

                                    "style":      React.PropTypes.object
                                  },

    "render":                     function () {
                                    // Pass any props we don't know how to handle onto the div
                                    var {
                                      visible,
                                      style,

                                      ...propsPassthrough
                                    } = this.props;

                                    // TODO: if props.style has a transition or transitionDuration key,
                                    // don't collapse the scrim height until after the tween finishes

                                    return  <div 
                                              style = { 
                                                        {
                                                          ...this.props.style,

                                                          ...(
                                                            this.props.visible
                                                              ? styles.visible
                                                              : styles.invisible
                                                          ),

                                                          ...styles.common,
                                                        }
                                                      }

                                              { ...propsPassthrough }
                                            />;
                                  }
  }
);

var styles = {
  "common":     {
                  "position":                     "fixed",
                  
                  "top":                          "0px",
                  "left":                         "0px",

                  "width":                        "100vw",

                  "backgroundColor":              "black",
                },

  "invisible":  {
                  "height":                       0,
                  "opacity":                      0,
                },

  "visible":    {
                  "height":                       "100vh",

                  "opacity":                      0.16,
                },
};

module.exports = Scrim;

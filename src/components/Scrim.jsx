var React       = require("react");

var Scrim = React.createClass(
  {
    "propTypes":                  {
                                    "visible":    React.PropTypes.bool.isRequired,

                                    "style":      React.PropTypes.object
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "style":   {},
                                    }
                                  },

    "getInitialState":            function () {
                                    return {
                                      "dissolving":   false,
                                    }
                                  },

    "componentWillReceiveProps":  function (nextProps) {
                                    // Sets a "dissolving" property on this.state while visible is 
                                    // transitioning to false.
                                    //
                                    // If CSS had a transitionstart event, this could be abstracted out
                                    // into a TransitionMixin

                                    if (
                                         (this.props.style.transitionDuration || this.props.style.transition) 
                                      && this.props.visible && !nextProps.visible
                                    ) {
                                      var node = this.getDOMNode();

                                      if (node) {
                                        this.setState(
                                          {
                                            "dissolving": true
                                          }
                                        );

                                        var finishDissolving = (event) => {
                                          node.removeEventListener(
                                            "transitionend",
                                            finishDissolving
                                          );

                                          this.setState(
                                            {
                                              "dissolving": false
                                            }
                                          );
                                        }

                                        node.addEventListener(
                                          "transitionend",
                                          finishDissolving
                                        );
                                      }
                                    }
                                  },

    "render":                     function () {
                                    // Pass any props we don't know how to handle onto the div
                                    var {
                                      visible,
                                      style,

                                      ...propsPassthrough
                                    } = this.props;

                                    return  <div 
                                              style = { 
                                                        {
                                                          "height":   this.props.visible || this.state.dissolving
                                                                        ? "100vh"
                                                                        : 0,


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
                  "opacity":                      0,
                },

  "visible":    {
                  "opacity":                      0.2,
                },
};

module.exports = Scrim;

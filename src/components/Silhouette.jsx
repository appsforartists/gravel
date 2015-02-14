var React       = require("react/addons");

var Silhouette = React.createClass(
  {
    "propTypes":                  {
                                    "src":        React.PropTypes.string.isRequired,
                                    "color":      React.PropTypes.string.isRequired,
                                    
                                    "style":      React.PropTypes.object
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "color":    "red",
                                      "style":    {},
                                    }
                                  },

    "render":                     function () {
                                    return  <div 
                                              style = {
                                                        {
                                                          ...this.props.style,

                                                          "WebkitMaskImage":  `url(${ this.props.src })`,
                                                          "backgroundColor":  this.props.color,

                                                          ...styles.container,
                                                        }
                                                      }
                                            >
                                              <img 
                                                src   = { this.props.src } 
                                                style = {
                                                          {
                                                            "opacity": 0,
                                                            
                                                            ...this.props.style,
                                                          }
                                                        }
                                              />
                                            </div>;
                                  }
  }
);

var styles = {
  "container":  {
                  // TODO: make autoprefixer wrapper for inline styles

                  "WebkitMaskSize":       "100%",
                  "WebkitMaskPosition":   "center center",
                  "WebkitMaskRepeat":     "no-repeat",
                }
};

module.exports = Silhouette;

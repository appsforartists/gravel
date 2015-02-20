var React       = require("react/addons");

var easings = require("../styles/easings");

var DisclosureTriangle = React.createClass(
  {
    "propTypes":                  {
                                    "collapsed":    React.PropTypes.bool.isRequired,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "depth":    0,
                                    }
                                  },

    "render":                     function () {
                                    return  <div
                                              style       = {
                                                              {
                                                                ...(
                                                                  this.props.collapsed
                                                                    ? styles.collapsed
                                                                    : null
                                                                ),
                                                                ...styles.common,
                                                                ...easings.fallAndRecoil,
                                                              }
                                                            }
                                            >
                                              <svg
                                                version   = "1.1"
                                                x         = "0px"
                                                y         = "0px"
                                                width     = "14px"
                                                height    = "7px"
                                                viewBox   = "0 0 14 7"
                                              >
                                                <polyline
                                                  points="
                                                    14, 0
                                                     7, 7
                                                     0, 0
                                                  "
                                                />
                                              </svg>
                                            </div>;
                                  }
  }
);

var styles = {
  "common":     {
                  "width":                        "1em",

                  "transitionProperty":           "transform -webkit-transform",
                  "transitionDuration":           ".3s",
                  
                  "cursor":                       "pointer",
                },

  "collapsed":  {
                  "transform":                    "rotate(-90deg)",
                },
};

module.exports = DisclosureTriangle;

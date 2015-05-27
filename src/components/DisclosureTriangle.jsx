var React       = require("react/addons");

var autoprefixStyleProp = require("autoprefix-style-prop");

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
                                                                ...this.props.style,
                                                              }
                                                            }
                                            >
                                              <svg
                                                version   = "1.1"
                                                x         = "0px"
                                                y         = "0px"
                                                width     = { `${ 2 * DisclosureTriangle.HEIGHT }px` }
                                                height    = { `${     DisclosureTriangle.HEIGHT }px` }
                                                viewBox   = { `0 0 ${ 2 * DisclosureTriangle.HEIGHT } ${ DisclosureTriangle.HEIGHT }` }
                                              >
                                                <polyline
                                                  points  = { 
                                                              `
                                                                ${ 2 * DisclosureTriangle.HEIGHT }, 0
                                                                ${     DisclosureTriangle.HEIGHT }, ${ DisclosureTriangle.HEIGHT }
                                                                0,                                  0
                                                              `
                                                            }
                                                />
                                              </svg>
                                            </div>;
                                  }
  }
);

DisclosureTriangle.HEIGHT = 7;

var styles = {
  "common":     autoprefixStyleProp(
                  {
                    "width":                        "1em",

                    "transitionProperty":           "transform -webkit-transform",
                    "transitionDuration":           ".3s",
                    
                    "cursor":                       "pointer",
                  }
                ),

  "collapsed":  autoprefixStyleProp(
                  {
                    "transform":                    "rotate(-90deg)",
                  }
                ),
};

module.exports = DisclosureTriangle;

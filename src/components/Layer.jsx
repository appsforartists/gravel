var React       = require("react/addons");

var View = require("./View");

var Layer = React.createClass(
  {
    "propTypes":                  {
                                    "elevation":      React.PropTypes.number
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "elevation":    0
                                    }
                                  },

    "componentWillMount":         function () {
                                    this.recomputeStyles();
                                  },
                                  
    "componentWillUpdate":        function (nextProps) {
                                    if (this.props.elevation != nextProps.elevation)
                                      this.recomputeStyles();
                                  },

    "recomputeStyles":            function () {
                                    this.setState(
                                      {
                                        "styles": {
                                                    "container":    Object.assign(
                                                                      {},
                                                                      
                                                                      this.props.style,
                                                                      stylesForElevation[this.props.elevation].container 
                                                                    ),

                                                    "secondShadow": Object.assign(
                                                                      {
                                                                        "position":   "absolute",
                                                                        "top":        0,
                                                                        "left":       0,
                                                                        "width":      "100%",
                                                                        "height":     "100%",
                                                                        "height":     -1000,
                                                                      },

                                                                      stylesForElevation[this.props.elevation].secondShadow
                                                                    )
                                                  }
                                      }
                                    )
                                  },

    "render":                     function () {
                                    /*  This was the first file ported over from SCSS and probably needs to be
                                     *  revisited.
                                     *  
                                     *  - The divs should be eliminated, with secondShadow added to the View's
                                     *    children.
                                     *
                                     *  - The whole recomputeStyles flow is could be a premature optimization 
                                     *    that doesn't match the rest of the library.
                                     *
                                     *  The original port of CollapsableShingles relied on Layer, but it was
                                     *  scrapped because it was introducing bugs where position:absolute
                                     *  was sticking to one of the divs even after it had been removed as a 
                                     *  prop.
                                     *
                                     *  I briefly experimented with concating secondShadow into 
                                     *  propsPassthrough.children, but it wasn't working as expected.
                                     *
                                     *  TODO: try again.
                                     */

                                    return  <div 
                                              style = { this.state.styles.container }
                                            >                                    
                                              <div 
                                                style = { this.state.styles.secondShadow } 
                                              />

                                              <View 
                                                { ...this.props }
                                              />
                                            </div>;
                                  }
  }
);

Layer.getStylesBelowElevation = function (elevation) {
  return {
    "zIndex": stylesForElevation[elevation].container.zIndex - 1000
  }
};

Layer.getStylesAboveElevation = function (elevation) {
  return {
    "zIndex": stylesForElevation[elevation].container.zIndex + 1000
  }
};

// Shadow values from https://www.google.com/design/spec/layout/layout-principles.html#layout-principles-dimensionality

var stylesForElevation = [
  {
    "container":    {
                      "zIndex":     0,
                    },
    "secondShadow": {} 
  },

  {
    "container":    {
                      "zIndex":     10000,
                      "boxShadow":  "0px 1px 1.5px rgba(  0,   0,   0, .12)",
                    },

    "secondShadow": {
                      "boxShadow":  "0px 1px 1px   rgba(  0,   0,   0, .24)",
                    } 
  },

  {
    "container":    {
                      "zIndex":     20000,
                      "boxShadow":  "0px 3px 3px rgba(  0,   0,   0, .16)",
                    },

    "secondShadow": {
                      "boxShadow":  "0px 3px 3px rgba(  0,   0,   0, .23)",
                    } 
  },

  {
    "container":    {
                      "zIndex":     30000,
                      "boxShadow":  "0px 10px 10px rgba(  0,   0,   0, .19)",
                    },

    "secondShadow": {
                      "boxShadow":  "0px  6px  3px rgba(  0,   0,   0, .23)",
                    } 
  },

  {
    "container":    {
                      "zIndex":     40000,
                      "boxShadow":  "0px 14px 14px rgba(  0,   0,   0, .25)",
                    },

    "secondShadow": {
                      "boxShadow":  "0px 10px  5px rgba(  0,   0,   0, .22)",
                    } 
  },
        
  {
    "container":    {
                      "zIndex":     50000,
                      "boxShadow":  "0px 19px 19px rgba(  0,   0,   0, .30)",
                    },

    "secondShadow": {
                      "boxShadow":  "0px 15px  6px rgba(  0,   0,   0, .22)",
                    } 
  },
];

module.exports = Layer;

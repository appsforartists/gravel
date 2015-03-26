var React       = require("react/addons");
var ReactRouter = require("react-router");

var Link            = ReactRouter.Link;

var autoprefixStyleProp = require("autoprefix-style-prop");

var packageGlobals = require("gravel");

var DisclosureTriangle  = require("./DisclosureTriangle");
var Layer               = require("./Layer");
var ListItemText        = require("./texts/ListItemText");

var Shingle = React.createClass(
  {
    "propTypes":                  {
                                    "label":                  React.PropTypes.string.isRequired,
                                    
                                    "linkTo":                 React.PropTypes.string,
                                    "linkParams":             React.PropTypes.object,
                                    "style":                  React.PropTypes.object,
                                    "depth":                  React.PropTypes.number,
                                    "collapsed":              React.PropTypes.bool,
                                    "toggleCollapsed":        React.PropTypes.func,
                                    "indentToMatchTriangle":  React.PropTypes.bool,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "depth":    0,
                                    }
                                  },

    "mixins":                     [
                                    React.addons.PureRenderMixin
                                  ],

    "render":                     function () {
                                    // This was originally a hack to be able to set indentation dynamically.
                                    // Since we are now using inline styles, this can probably be simplified.
                                    var indentation = [];

                                    for (var i = 0; i < this.props.depth; i++) {
                                      indentation.push(
                                        <span style = { styles.indent } />
                                      );
                                    }

                                    if (this.props.indentToMatchTriangle || this.props.hasOwnProperty("collapsed")) {
                                      if (this.props.hasOwnProperty("collapsed")) {
                                        var maybeDisclosureTriangle = <DisclosureTriangle
                                                                        collapsed   = { this.props.collapsed }
                                                                      />;
                                      }

                                      // The placeholder serves two purposes:
                                      //  - It makes sure labels are aligned, even in shingles that don't have triangles,
                                      //    and
                                      //  - It takes up space so we can absolutely position the triangle without
                                      //    destroying the layout
                                      var maybeDisclosureTrianglePlaceholder =  <div 
                                                                                  style       = { 
                                                                                                  {
                                                                                                    ...(
                                                                                                      this.props.toggleCollapsed
                                                                                                        ? styles.disclosureTriangleContainer
                                                                                                        : null
                                                                                                    ),
                                                                                                    ...styles.disclosureTrianglePlaceholder,
                                                                                                  }
                                                                                                }
                                                                                  onTouchTap  = { this.props.toggleCollapsed }
                                                                                >
                                                                                  { maybeDisclosureTriangle }
                                                                                </div>;
                                    }

                                    var label = this.props.label;

                                    if (this.props.linkTo) {
                                      label = <Link
                                                to     = { this.props.linkTo }
                                                params = { this.props.linkParams }
                                                style  = { styles.link }
                                              >
                                                { label }
                                              </Link>;
                                    
                                    } else {
                                      label = <span
                                                onTouchTap = { this.props.toggleCollapsed }
                                              >
                                                { label }
                                              </span>
                                    }

                                    return  <Layer
                                              elevation   = { 0 }
                                              style       = {
                                                              {
                                                                ...this.props.style,
                                                                ...styles.container,

                                                                // Fix weird z-indexing bugs when you click the DisclosureTriangle
                                                                ...Layer.getStylesBelowElevation(1),
                                                              }
                                                            }
                                            >
                                              { indentation }
                                              { maybeDisclosureTrianglePlaceholder }

                                              <ListItemText
                                                style = { styles.label }
                                              >
                                                { label }
                                              </ListItemText>
                                            </Layer>;
                                  }
  }
);

var styles = {
  "container":                      autoprefixStyleProp(
                                      {
                                        "flexDirection":                "row",
                                        "flexWrap":                     "nowrap",
                                        "alignItems":                   "center",

                                        "paddingRight":                 16,

                                        // Use a reasonable lineHeight to make it clear which lines belong to which shingle
                                        "lineHeight":                   "1.5em",

                                        "textDecoration":               "none",
                                        "color":                        "inherit",
                                      }
                                    ),

  "link":                           autoprefixStyleProp(
                                      {
                                        "color":                        "inherit",
                                        "textDecoration":               "none",
                                      }
                                    ),
                                    
  "label":                          autoprefixStyleProp(
                                      {
                                        "paddingTop":                   13,
                                        "paddingBottom":                13,
                                      }
                                    ),
                                    
  "indent":                         autoprefixStyleProp(
                                      {
                                        // Each disclosure triangle is a 7px icon in a button-sized square;
                                        // indent so the triangles and labels are flush.
                                        "width":                        (packageGlobals.TOUCH_TARGET_MINIMUM_SIZE + 7) / 2,
                                        "height":                       packageGlobals.TOUCH_TARGET_MINIMUM_SIZE,
                                        "flex":                         "none",
                                      }
                                    ),

  "disclosureTriangleContainer":    autoprefixStyleProp(
                                      {
                                        "justifyContent":               "center",
                                        "alignItems":                   "center",
                                        "cursor":                       "pointer",
                                      }
                                    ),

  "disclosureTrianglePlaceholder":  autoprefixStyleProp(
                                      {
                                        "width":                        packageGlobals.TOUCH_TARGET_MINIMUM_SIZE,
                                        "height":                       packageGlobals.TOUCH_TARGET_MINIMUM_SIZE,
                                        "flex":                         "none",
                                      }
                                    ),
};

module.exports = Shingle;

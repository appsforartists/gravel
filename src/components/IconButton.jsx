var React       = require("react");
var ReactRouter = require("react-router");

var autoprefixStyleProp = require("autoprefix-style-prop");

var Silhouette  = require("./Silhouette");
var CaptionText = require("./texts/CaptionText");

var IconButton = React.createClass(
  {
    "propTypes":                  {
                                    "src":              React.PropTypes.string.isRequired,

                                    "onTouchTap":       React.PropTypes.func,
                                    "linkTo":           React.PropTypes.string,
                                    "href":             React.PropTypes.string,
                                    "label":            React.PropTypes.string,
                                    "labelColor":       React.PropTypes.string,
                                    "makeSilhouette":   React.PropTypes.bool,
                                    "silhouetteColor":  React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "makeSilhouette":   false
                                    }
                                  },

    "render":                     function () {
                                    /*  ReactRouter will break if you try to make a Link without
                                     *  a `to` attribute, but <IconButton> should work with
                                     *  internal links, external links, or onTouchTap handlers.
                                     *
                                     *  Therefore, we dynamically construct the button using
                                     *  either <Link> or <a>, as appropriate.
                                     */
                                    var LinkClass;
                                    var linkAttributes = {};

                                    if (this.props.linkTo) {
                                      LinkClass         = ReactRouter.Link;
                                      linkAttributes.to = this.props.linkTo;
                                    
                                    } else {
                                                            // React.DOM.a is now just "a"
                                      LinkClass           = "a";
                                      linkAttributes.href = this.props.href;
                                    }

                                    var ImageClass = this.props.makeSilhouette
                                      ? Silhouette
                                      : "img";
                                    
                                    return  <LinkClass 
                                              style = { styles.link }

                                              { ...this.props } 
                                              { ...linkAttributes }
                                            >
                                              <ImageClass 
                                                src   = { this.props.src } 
                                                style = { styles.image }
                                                color = { this.props.silhouetteColor }
                                              />
                                    
                                              {
                                                this.props.label
                                                  ? <CaptionText
                                                      style = { 
                                                                {
                                                                  "color":  this.props.labelColor,
                                                                  
                                                                  ...styles.label,
                                                                }
                                                              }
                                                    >
                                                      { this.props.label }
                                                    </CaptionText>
                                                  : ""
                                              }
                                            </LinkClass>;
                                  }
  }
);

IconButton.VISIBLE_SIZE = 24;
IconButton.PADDING      = 12;
IconButton.TOTAL_SIZE   = IconButton.VISIBLE_SIZE + 2 * IconButton.PADDING;

var styles = {
  "link":     autoprefixStyleProp(
                {
                  "display":                      "inline-flex",
                  "flexDirection":                "column",
                  "justifyContent":               "center",
                  "alignItems":                   "center",

                  "width":                        IconButton.TOTAL_SIZE,
                  "height":                       IconButton.TOTAL_SIZE,
                  "padding":                      IconButton.PADDING,

                  "color":                        "inherit",
                  "textDecoration":               "none",

                  "cursor":                       "pointer",
                }
              ),

  "image":    autoprefixStyleProp(
                {
                  "width":                        IconButton.VISIBLE_SIZE,
                  "height":                       IconButton.VISIBLE_SIZE,
                }
              ),

  "label":    autoprefixStyleProp(
                {
                  "opacity":                      1,

                  // Allow lines to break because it looks better here (even though Material Design says captions don't break)
                  "whiteSpace":                  "inherit",
                  "textAlign":                   "center",

                  // trick flexbox into treating this as one line, so they stay
                  // top-aligned but centered
                  "height":                       "1em",
                  "overflowY":                    "visible",
                }
              ),
};

module.exports = IconButton;

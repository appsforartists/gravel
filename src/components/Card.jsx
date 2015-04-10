var React       = require("react/addons");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

var autoprefixStyleProp = require("autoprefix-style-prop");

var packageGlobals = require("gravel");

var Layer = require("./Layer");
var {
  HeadlineText,
  GridTileTitleText,
  GridTileSubtitleText,
} = require("./texts");

var Card = React.createClass(
  {
    "propTypes":                  {
                                    "elevation":      React.PropTypes.number,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "elevation":   1
                                    }
                                  },

    "render":                     function () {
                                    var cardType = this.props.subtitle
                                      ? "polaroidTitle"
                                      : "overlaidTitle";

                                    switch (cardType) {
                                      case "overlaidTitle":
                                        return  <Layer
                                                  elevation = { this.props.elevation }
                                                  style     = {
                                                                {
                                                                  ...styles.container,
                                                                  ...this.props.style,
                                                                }
                                                              }
                                                >
                                                  <Link
                                                    style     = {
                                                                  {
                                                                    ...styles.link,
                                                                    ...styles.overlaidTitle,
                                                                  }
                                                                }

                                                    to        = { this.props.linkTo }
                                                    params    = { this.props.linkParams }
                                                  >
                                                    <HeadlineText>
                                                      { this.props.title }
                                                    </HeadlineText>
                                                  </Link>

                                                  <div style = { styles.imageContainer }>
                                                    { this.props.image }
                                                  </div>

                                                  <div style = { styles.bottomBar }>
                                                    { this.props.actionButtons }
                                                  </div>
                                                </Layer>;

                                      case "polaroidTitle":
                                        return  <Layer
                                                  elevation = { 1 }
                                                  style     = {
                                                                {
                                                                  ...styles.container,
                                                                  ...this.props.style,
                                                                }
                                                              }
                                                >
                                                  <Link
                                                    style     = {
                                                                  {
                                                                    ...styles.imageContainer,
                                                                    ...styles.link,
                                                                  }
                                                                }

                                                    to        = { this.props.linkTo }
                                                    params    = { this.props.linkParams }
                                                  >
                                                    { this.props.image }
                                                  </Link>

                                                  <div style = { styles.bottomBar }>
                                                    <Link
                                                      style     = {
                                                                    {
                                                                      ...styles.link,
                                                                      ...styles.polaroidTitle,
                                                                    }
                                                                  }
                                                      to        = { this.props.linkTo }
                                                      params    = { this.props.linkParams }
                                                    >
                                                      <GridTileTitleText>
                                                        { this.props.title }
                                                      </GridTileTitleText>

                                                      <GridTileSubtitleText>
                                                        { this.props.subtitle }
                                                      </GridTileSubtitleText>
                                                    </Link>

                                                    { this.props.actionButtons }
                                                  </div>
                                                </Layer>;
                                    }
                                  }
  }
);

Card.BORDER_RADIUS = 2;

var styles = {
  "container":      {
                      "borderRadius":                 Card.BORDER_RADIUS,

                      // crops to border-radius
                      "overflow":                     "hidden",
                    },

  "link":           {
                      "color":                        "inherit",
                      "textDecoration":               "none",
                    },

  "imageContainer": {
                      "display":                      "flex",
                    },

  "bottomBar":      autoprefixStyleProp(
                      {
                        "flex":                         "none",
                        "minHeight":                    packageGlobals.TOUCH_TARGET_MINIMUM_SIZE,

                        "paddingLeft":                  8,
                        "paddingRight":                 8,
                      }
                    ),

  "overlaidTitle":  autoprefixStyleProp(
                      {
                        "position":                     "absolute",
                        "padding":                      16,
                        "display":                      "flex",
                        "alignItems":                   "flex-end",

                        "width":                        "100%",
                        "height":                       `calc(100% - ${ packageGlobals.TOUCH_TARGET_MINIMUM_SIZE })`,
                      }
                    ),

  "polaroidTitle":  {
                      "paddingTop":                   16,
                      "paddingBottom":                16,

                      // compensate for BottomBar's padding
                      "paddingLeft":                  8,
                      "paddingRight":                 8,
                      "display":                      "inline-block",
                      "maxWidth":                     "100%",
                    },
};

module.exports = Card;

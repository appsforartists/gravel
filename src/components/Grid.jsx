var React       = require("react/addons");

var autoprefixStyleProp = require("autoprefix-style-prop");

var Grid = React.createClass(
  {
    "propTypes":                  {
                                    "rowLength":    React.PropTypes.number,
                                    "width":        React.PropTypes.string,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "rowLength":  2,
                                      "width":      "100vw",
                                    }
                                  },

    "componentWillMount":         function () {
                                    this.recalculateTileWidth();
                                  },

    "componentWillUpdate":        function () {
                                    this.recalculateTileWidth();
                                  },

    "recalculateTileWidth":       function () {
                                    var mysteryNudge = this.props.rowLength <= 3
                                      ? 2
                                      : 1;

                                    this.setState(
                                      {
                                        "tileWidth":  `calc(${ this.props.width } / ${ this.props.rowLength } - ${ Grid.MARGIN + mysteryNudge }px)`,
                                      }
                                    );
                                  },

    "render":                     function () {
                                    return  <ul
                                              style = { 
                                                        {
                                                          "width":  this.props.width,

                                                          ...styles.container
                                                        }
                                                      }
                                            >
                                              {
                                                this.props.children.map(
                                                  child =>  <li 
                                                              style = { 
                                                                        {
                                                                          "width":  this.state.tileWidth,

                                                                          ...styles.tile
                                                                        }
                                                                      }
                                                            >
                                                              { child }
                                                            </li>
                                                )
                                              }
                                            </ul>;
                                  }
  }
);

Grid.MARGIN = 4;

var styles = {
  "container":      autoprefixStyleProp(
                      {
                        "margin":                       Grid.MARGIN / 2,

                        "display":                      "flex",
                        "justifyContent":               "flex-start",
                        "alignItems":                   "flex-start",
                        "flexDirection":                "row",
                        "flexFlow":                     "wrap",

                        // fix ghost margins between lines
                        "fontSize":                     "0px",
                      }
                    ),
                                        
  "tile":           autoprefixStyleProp(
                      {
                        "display":                      "inline-flex",
                        "margin":                       Grid.MARGIN / 2,
                      }
                    ),
};

module.exports = Grid;

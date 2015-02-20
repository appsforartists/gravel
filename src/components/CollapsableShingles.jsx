var Immutable             = require("immutable");
var ImmutableRenderMixin  = require("react-immutable-render-mixin");
var React                 = require("react/addons");
var classSet              = React.addons.classSet;

var Layer   = require("./Layer");
var Shingle = require("./Shingle");

var CollapsableShingles = React.createClass(
  {
    "propTypes":                  {
                                    "model":      React.PropTypes.instanceOf(Immutable.Map).isRequired,
                                    "depth":      React.PropTypes.number,
                                    "style":      React.PropTypes.object,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "depth":    0,
                                    }
                                  },

    "getInitialState":            function () {
                                    // The root model should be untitled; it's only a container for its children
                                    var isRoot = !this.props.model.has("label");

                                    return {
                                      "collapsed":  !isRoot,
                                      "isRoot":     isRoot,
                                    }
                                  },

    "mixins":                     [
                                    ImmutableRenderMixin,
                                  ],                              

    "toggleCollapsed":            function () {
                                    this.setState({
                                      "collapsed":  !this.state.collapsed
                                    })
                                  },

    "render":                     function () {
                                    var depth = this.props.depth;
                                    var model = this.props.model;

                                    var contents = [];

                                    var hasChildren = model.get("children") && model.get("children").size > 0;

                                    if (!this.state.isRoot) {
                                      var shingleProps = {};

                                      if (hasChildren) {
                                        shingleProps["collapsed"]       = this.state.collapsed;
                                        shingleProps["toggleCollapsed"] = this.toggleCollapsed;
                                      }
                                      
                                      contents.push(
                                        <Shingle 
                                          label                   = { model.get("label") }
 
                                          linkTo                  = { model.get("linkTo") }
                                          linkParams              = { model.get("linkParams") }
                                          
                                          depth                   = { depth }
                                          indentToMatchTriangle   = { true 
                                                                      // The naïve solution is to only set this if our siblings have children,
                                                                      // but that make it ambiguous which is an unindented child and which is
                                                                      // an indented sibling.  Therefore, this is always true (for now, anyway).
                                                                  }
                                          { ...shingleProps } 
                                        />
                                      );
                                    }

                                    if (hasChildren) {
                                      contents = contents.concat(
                                        model.get("children").map(
                                          childModel => <CollapsableShingles
                                                          model = { childModel }
                                                          key   = { childModel.get("label") }
                                                          depth = {  
                                                                    this.state.isRoot
                                                                      ? 0
                                                                      : this.props.depth + 1 
                                                                  }
                                                          style = {
                                                                    {
                                                                      ...(
                                                                        this.state.collapsed && !this.state.isRoot
                                                                          ? styles.collapsed
                                                                          : null
                                                                      )
                                                                    }
                                                                  }
                                                        />
                                        ).toArray()
                                      )
                                    }

                                    return  <div
                                              style     = { this.props.style || {} }
                                            >
                                              { contents }
                                            </div>;
                                  }
  }
);

var styles = {
  "collapsed":  {
                  "position":                     "absolute",
                  "height":                       0,
                  "overflow":                     "hidden",
                },
};

module.exports = CollapsableShingles;

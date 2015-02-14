var React       = require("react/addons");

var View = React.createClass(
  {
    "propTypes":                  {
                                    "tagName":    React.PropTypes.string
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "tagName":  "div",
                                    }
                                  },

    "render":                     function () {
                                    var {
                                      tagName,
                                      ...propsPassthrough
                                    } = this.props;

                                    return React.createElement(
                                      tagName,
                                      propsPassthrough
                                    );
                                  }
  }
);

module.exports = View;

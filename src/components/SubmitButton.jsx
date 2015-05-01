var React       = require("react/addons");
var Immutable   = require("immutable");

var Button       = require("./Button");

var SubmitButton = React.createClass(
  {
    "propTypes":                  {
                                    "label":              React.PropTypes.string,
                                    "onTouchTap":         React.PropTypes.func,
                                  },

    "getDefaultProps":            function () {
                                    return {
                                      "label":            "Submit",
                                    }
                                  },

    "render":                     function () {
                                    return  <Button
                                              onTouchTap  = { this.onTouchTap || this.submit }

                                              { ...this.props } 
                                            />;
                                  },

    "submit":                     function (event) {
                                    var buttonNode = this.getDOMNode();

                                    Immutable.Seq(document.forms).forEach(
                                      form => {
                                        if (form.contains(buttonNode)) {
                                          form.submit();
                                          return false;
                                        }
                                      }
                                    )
                                  },
  }
);

module.exports = SubmitButton;

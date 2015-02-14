var React       = require("react/addons");

var ScrollPane = React.createClass(
  {
    "render":                     function () {
                                    return  <div style = { styles.container }>
                                              <div style = { styles.child }>
                                                { this.props.children }
                                              </div>
                                            </div>;
                                  }
  }
);

var styles = {
  "container":  {
                  "height":                       "100vh",
                  "maxHeight":                    "100%",

                  "overflowY":                    "auto",
                  "WebkitOverflowScrolling":      "touch",    // Dumbass Safari won't inertial scroll unless you manually "opt-in
                },

  "child":      {
                  "minWidth":                     "100%",
                  "minHeight":                    "100%",
                },
};

module.exports = ScrollPane;

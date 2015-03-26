module.exports = {
  "externalActionDefinitions":  [
                                  "showLeftDrawer",
                                  "hideLeftDrawer",

                                  "showRightDrawer",
                                  "hideRightDrawer",
                                ],

  "storeDefinitions":           {
                                  "stateful":   {
                                                  "LeftDrawerIsOpen":   {
                                                                          "getInitialValue":  function () {
                                                                                                return false;
                                                                                              },

                                                                          "serialize":        function (lastValue) {
                                                                                                return lastValue;
                                                                                              },

                                                                          "deserialize":      function (serializedLastValue) {
                                                                                                return serializedLastValue;
                                                                                              },

                                                                          "actionHandlers":   {
                                                                                                "showLeftDrawer":     function (_, lastValue) {
                                                                                                                        return true;
                                                                                                                      },

                                                                                                "hideLeftDrawer":     function (_, lastValue) {
                                                                                                                        return false;
                                                                                                                      },

                                                                                                "routerStateChanged": function (_, lastValue) {
                                                                                                                        return false;
                                                                                                                      },
                                                                                              }

                                                                        },
                                                  "RightDrawerIsOpen":  {
                                                                          "getInitialValue":  function () {
                                                                                                return false;
                                                                                              },

                                                                          "serialize":        function (lastValue) {
                                                                                                return lastValue;
                                                                                              },

                                                                          "deserialize":      function (serializedLastValue) {
                                                                                                return serializedLastValue;
                                                                                              },

                                                                          "actionHandlers":   {
                                                                                                "showRightDrawer":    function (_, lastValue) {
                                                                                                                        return true;
                                                                                                                      },

                                                                                                "hideRightDrawer":    function (_, lastValue) {
                                                                                                                        return false;
                                                                                                                      },

                                                                                                "routerStateChanged": function (_, lastValue) {
                                                                                                                        return false;
                                                                                                                      },
                                                                                              }

                                                                        },
                                                },
                                },
};

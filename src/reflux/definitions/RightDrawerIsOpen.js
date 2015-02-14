var RightDrawerIsOpen = {
  "actions":      [
                    "showRightDrawer",
                    "hideRightDrawer"
                  ],

  "store":        {
                    "init":               function () {
                                            this.state = false;

                                            this.trigger(this.state);
                                          },

                    "onShowRightDrawer":  function () {
                                            this.state = true;

                                            this.trigger(this.state);
                                          },

                    "onHideRightDrawer":  function () {
                                            this.state = false;

                                            this.trigger(this.state);
                                          },
                  },
};

module.exports = RightDrawerIsOpen;

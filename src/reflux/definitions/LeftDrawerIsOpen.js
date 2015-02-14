var LeftDrawerIsOpen = {
  "actions":      [
                    "showLeftDrawer",
                    "hideLeftDrawer"
                  ],

  "store":        {
                    "init":               function () {
                                            this.state = false;

                                            this.trigger(this.state);
                                          },

                    "onShowLeftDrawer":   function () {
                                            this.state = true;

                                            this.trigger(this.state);
                                          },

                    "onHideLeftDrawer":   function () {
                                            this.state = false;

                                            this.trigger(this.state);
                                          },
                  },
};

module.exports = LeftDrawerIsOpen;

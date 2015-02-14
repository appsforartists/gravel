// All tweens should have follow through.  It just looks better.
// http://en.wikipedia.org/wiki/12_basic_principles_of_animation#Follow_through_and_overlapping_action

module.exports = {
  "easeOut":        {
                      "transitionTimingFunction": "cubic-bezier(0.190,  0.300, 0.530, 1.320)"
                    },

  "easeInOut":      {
                      "transitionTimingFunction": "cubic-bezier(0.640, -0.290, 0.530, 1.320)"
                    },

  "fallAndRecoil":  {
                      "transitionTimingFunction": "cubic-bezier(0.560,  0.000, 0.410, 1.540)"
                    },
};

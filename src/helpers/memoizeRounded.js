function memoizeRounded (precision, callback) {
  var lastDict = {};
  var lastResult;

  if (arguments.length === 1) {
    callback  = arguments[0];
    precision = 1;
  }

  var coefficient = 1 / precision;

  return function (dict) {
    var changed = false;
    var roundedDict = {};

    for (var key in dict) {
      roundedDict[key] = Math.round(dict[key] * coefficient) / coefficient || dict[key];

      if (roundedDict[key] !== lastDict[key])
        changed = true;
    }

    if (!changed && lastResult) {
      return lastResult;

    } else {
      lastDict = roundedDict;
      return lastResult = callback(roundedDict);
    }
  }
}

module.exports = memoizeRounded;
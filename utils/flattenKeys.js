var _ = require('lodash');

module.exports = flattenKeys = function (obj) {
  var keys = _.keys(obj);
  if (keys.length) {
    var childKeys = _.map(obj, flattenKeys).reduce(function (a, b) {
      return a.concat(b)
    });
    keys = keys.concat(childKeys);
  }
  return keys;
};
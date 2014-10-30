var _ = require('lodash');

var flattenKeys = function (obj, namespace) {
  namespace = typeof namespace === 'undefined' ? '' : namespace;
  var keys = _
    .keys(obj)
    .map(function (key) {
      return namespace ? namespace + key : key;
    });

  if (keys.length) {
    var childKeys = _
      .map(obj, function (child, childKey) {
        return flattenKeys(child, namespace + childKey + '/');
      })
      .reduce(function (a, b) {
        return a.concat(b)
      });
    keys = keys.concat(childKeys);
  }
  return keys;
};

module.exports = flattenKeys;
var _ = require('lodash');

var flattenKeys = function (obj, namespace, depth) {
  namespace = typeof namespace === 'undefined' ? '' : namespace;
  depth = typeof depth === 'undefined' ? 0 : depth;
  var keys = _
    .keys(obj)
    .map(function (key) {
      return namespace ? namespace + key : key;
    });

  if (keys.length) {
    var childKeys = _
      .map(obj, function (child, childKey) {
        return flattenKeys(child, namespace + childKey + '/', depth + 1);
      })
      .reduce(function (a, b) {
        return a.concat(b)
      });
    if (depth === 0) {
      keys = childKeys;
    } else {
      keys = keys.concat(childKeys);
    }
  }
  return keys;
};

module.exports = flattenKeys;
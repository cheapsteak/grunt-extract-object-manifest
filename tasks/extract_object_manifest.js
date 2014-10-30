'use strict';

var path = require('path');
var _ = require('lodash');
var extractObjectManifest = require('extract-object-manifest');
var flattenKeys = require('../utils/flattenKeys');

module.exports = function(grunt) {

  grunt.registerMultiTask('extract_object_manifest', 'Grunt task for extract-object-manifest', function() {
    var options = this.options();

    var nestedManifest = _(options.models)
      .map(function (daePath) {
        var jsonPath = daePath.replace(/.dae$/,'.json');
        var json = grunt.file.readJSON(jsonPath);
        return extractObjectManifest(json);
      })
      .reduce(function (a, b) {
        return _.extend(a, b);
      });

    var flatManifest = flattenKeys(nestedManifest);

    // for now, output of manifests will be in same folder as first input file
    var firstFilePath = path.resolve(options.models[0]);
    var dest = firstFilePath.substring(0, firstFilePath.lastIndexOf('/'));

    grunt.file.write(dest + '/manifest.nested.json', JSON.stringify(nestedManifest, null, 2));
    grunt.file.write(dest + '/manifest.json', JSON.stringify(flatManifest, null, 2));
  });

};

'use strict';

var path = require('path');
var _ = require('lodash');
var extractObjectManifest = require('threejs-model-manifest');
var flattenKeys = require('../utils/flattenKeys');

module.exports = function(grunt) {

  grunt.registerMultiTask('threejs_model_manifest', 'Grunt task for extract-object-manifest', function() {
    var options = this.options();

    _(options.models).each(function (daePath) {
        daePath = path.normalize(daePath);
        var jsonPath = daePath.replace(/.dae$/,'.json');
        var pathDelimiter = process.platform === "win32" ? '\\' : '/';
        var filename = jsonPath.substring(jsonPath.lastIndexOf(pathDelimiter) + 1, jsonPath.lastIndexOf('.'));
        var json = grunt.file.readJSON(jsonPath);

        var nested = extractObjectManifest(json, options.depth);
        var flat = flattenKeys(nested);

        var outputPath = path.resolve(daePath);
        var dest = outputPath.substring(0, outputPath.lastIndexOf(pathDelimiter));

        var nestedPath = dest + pathDelimiter + filename + '.manifest.nested.json';
        var flatPath = dest + pathDelimiter + filename + '.manifest.flat.json';
        grunt.file.write(nestedPath, JSON.stringify(nested, null, 2));
        grunt.file.write(flatPath, JSON.stringify(flat, null, 2));
      });
  });

};

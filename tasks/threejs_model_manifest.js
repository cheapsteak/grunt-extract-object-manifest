'use strict';

var path = require('path');
var _ = require('lodash');
var extractObjectManifest = require('threejs-model-manifest');
var flattenKeys = require('../utils/flattenKeys');

module.exports = function(grunt) {

  grunt.registerMultiTask('threejs_model_manifest', 'Grunt task for extract-object-manifest', function() {
    var options = this.options();

    _(options.models).each(function (daePath) {
        var jsonPath = daePath.replace(/.dae$/,'.json');
        var filename = jsonPath.substring(jsonPath.lastIndexOf('/') + 1, jsonPath.lastIndexOf('.'));
        var json = grunt.file.readJSON(jsonPath);

        var nested = extractObjectManifest(json);
        var flat = flattenKeys(nested);

        // for now, output of manifests will be in same folder as first input file
        var firstFilePath = path.resolve(options.models[0]);
        var dest = firstFilePath.substring(0, firstFilePath.lastIndexOf('/'));

        var nestedPath = dest + '/' + filename + '.manifest.nested.json';
        var flatPath = dest + '/' + filename + '.manifest.flat.json';
        if(nestedPath.lastIndexOf('/') == 0) nestedPath = nestedPath.substring(1, nestedPath.length);
        if(flatPath.lastIndexOf('/') == 0) flatPath = flatPath.substring(1, flatPath.length);
        nestedPath = path.normalize(nestedPath);
        flatPath = path.normalize(flatPath);
        grunt.file.write(nestedPath, JSON.stringify(nested, null, 2));
        grunt.file.write(flatPath, JSON.stringify(flat, null, 2));
      });
  });

};

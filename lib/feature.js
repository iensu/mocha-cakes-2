'use strict';

var colors = require('colors/safe');
var mochaFuncFactory = require('./helpers').mochaFuncFactory;

function feature(mochaInstance, options) {

  options = options || {};

  var _feature = mochaFuncFactory(mochaInstance.describe, format(options));
  _feature.only = mochaFuncFactory(mochaInstance.describe.only, format(options));
  _feature.skip = mochaFuncFactory(mochaInstance.describe.skip, format(options));

  return _feature;
}

function format(options) {
  return function (feature, story, callback) {
    var message  = 'Feature: ' + feature + '\n';

    if (options.style) {
      message = colors.green.underline.bold(message);
    }

    if (typeof story === 'function') {
      callback = story;
    } else {
      message += story.map(function (part) {
        return '\t' + part + '\n';
      });
    }
    return {
      message: message,
      callback: callback
    };
  };
}

module.exports = feature;

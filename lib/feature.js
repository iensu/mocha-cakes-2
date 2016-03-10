'use strict';

var colors = require('colors/safe');

function feature(mochaInstance, options) {

  options = options || {};

  function _feature(feature, story, callback) {
    var formatted = format(options, feature, story, callback);
    mochaInstance.describe(formatted.message, formatted.callback);
  }
  _feature.skip = function (feature, story, callback) {
    var formatted = format(options, feature, story, callback);
    mochaInstance.describe.skip(formatted.message, formatted.callback);
  };
  _feature.only = function (feature, story, callback) {
    var formatted = format(options, feature, story, callback);
    mochaInstance.describe.only(formatted.message, formatted.callback);
  };
  return _feature;
}

function format(options, feature, story, callback) {
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

module.exports = feature;

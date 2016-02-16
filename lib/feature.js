'use strict';

var colors = require('colors/safe');

function feature(mochaInstance, options) {

  options = options || {};

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

    return mochaInstance.describe(message, callback);
  };
}

module.exports = feature;

'use strict';

var colors = require('colors/safe');

function feature(mochaInstance, options) {

  options = options || {};

  return function (feature, story, callback) {
    if (options.label) feature = 'Feature: ' + feature;
    if (options.whitespace) feature = feature + '\n';
    if (options.style) feature = colors.green.underline.bold(feature);

    var message = feature + '\n';

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

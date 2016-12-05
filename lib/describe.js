'use strict';

var colors = require('colors/safe');

function describe(mochaInstance, options) {
  options = options || {};

  return function (message, callback) {
    message = "=== " + message + " ===";

    if (options.style) {
      message =  colors.blue(message);
    }

    return mochaInstance.describe(message, callback);
  };
}

module.exports = describe;

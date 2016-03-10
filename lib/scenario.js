'use strict';

var colors = require('colors/safe');
var mochaFuncFactory = require('./helpers').mochaFuncFactory;

function scenario(mochaInstance, options) {
  options = options || {};

  var _scenario = mochaFuncFactory(mochaInstance.describe, format(options));
  _scenario.only = mochaFuncFactory(mochaInstance.describe.only, format(options));
  _scenario.skip = mochaFuncFactory(mochaInstance.describe.skip, format(options));
  return _scenario;
}

function format(options) {
  return function (message, callback) {
    if (!message) {
      // indicates scenario is to be skipped
      // and that the callback is actually the message
      message = formatSkippedMessage(callback, options);
      return { message: message, callback: function () {} };
    }

    message = '\n    Scenario: ' + message;

    if (options.style) {
      message = colors.green(message);
    }

    return {
      message: message,
      callback: callback
    };
  };
}

function formatSkippedMessage(message, options) {
  message = '\n    (skipped) ' + message;

  if (options.style) {
    message = colors.yellow.bold(message);
  }

  return message;
}

module.exports = scenario;

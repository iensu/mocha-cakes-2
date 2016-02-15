'use strict';

var colors = require('colors/safe');

function scenario(mochaInstance, options) {

  options = options || {};

  return function (message, callback) {
    if (!message) {
      return skipScenario(mochaInstance, callback, options);
    }

    if (options.label) message = 'Scenario: ' + message;
    if (options.whitespace) message = '\n    ' + message;
    if (options.style) message = colors.green(message);

    return mochaInstance.describe(message, callback);
  };
}

function skipScenario(mochaInstance, message, options) {
  options = options || {};

  if (options.label) message = '(skipped) ' + message;
  if (options.whitespace) message = '\n    ' + message;
  if (options.style) message = colors.yellow.bold(message);

  mochaInstance.describe(message, function () {});
}

module.exports = scenario;

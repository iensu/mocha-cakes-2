'use strict';

var colors = require('colors/safe');

var helpers = require('./helpers');

function system(mochaInstance, options) {
  options = options || {};

  return function (message, callback) {

    var label = ' [system] ';

    if (options.style) {
      label = colors.grey.italic(label);
    }

    var args;
    if (typeof message === 'function') {
      args = helpers.isPending('describe', '', message);
    } else {
      args = helpers.isPending('it', message, callback);
      if (options.style && !callback) message = colors.cyan(message);
    }

    label = label + args.message;

    return helpers.describeItNested(mochaInstance,
                               args.command,
                               label,
                               args.callback,
                               options);
  };
}

module.exports = system;

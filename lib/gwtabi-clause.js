'use strict';

var colors = require('colors/safe');

var helpers = require('./helpers');

function createClause(mochaInstance, label, options) {
  return function (message, callback) {
    label = gwtLabel(label, options);
    return gwtItDescribe(mochaInstance, label, message, callback, options);
  };
}

function gwtItDescribe(mochaInstance, label, message, callback, options) {
  var command = 'describe';

  if (typeof message === 'function') { // describe!
    callback = message;
    message = label;
  } else { // it!
    message = label + message;
    command = 'it';
  }

  var pending = helpers.isPending(command, message, callback);

  return helpers.describeItNested(mochaInstance,
                             pending.command,
                             pending.message,
                             pending.callback,
                             options);
}

function gwtLabel(label, options) {
  if (!(label || options.label)) return '';

  if (!options.style) return label;

  if (options.dark) {
    label = colors.grey(label);
  } else if (options.white) {
    label = colors.white(label);
  } else {
    label = colors.yellow(label);
  }

  return label;
}

module.exports = createClause;

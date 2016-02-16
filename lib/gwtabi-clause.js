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
  if (!label) {
    return '';
  }

  if (!options.style){
    return label;
  }

  if (options.dark) {
    return colors.grey(label);
  }

  if (options.white) {
    return colors.white(label);
  }

  return colors.yellow(label);
}

module.exports = createClause;

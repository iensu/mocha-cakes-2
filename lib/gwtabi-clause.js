'use strict';

var colors = require('colors/safe');

var helpers = require('./helpers');

function createClause(mochaInstance, label, options) {
  options = options || {};

  function _createClause(message, callback) {
    var formatted = format(label, message, callback, options);
    helpers.describeItNested(mochaInstance, formatted.command, formatted.message, formatted.callback, options);
  }
  _createClause.only = function (message, callback) {
    var formatted = format(label, message, callback, options);
    helpers.describeItNested.only(mochaInstance, formatted.command, formatted.message, formatted.callback, options);
  };
  _createClause.skip = function (message, callback) {
    var formatted = format(label, message, callback, options);
    formatted.message = colors.bold.cyan(colors.stripColors(formatted.message));
    helpers.describeItNested.skip(mochaInstance, formatted.command, formatted.message, formatted.callback, options);
  };

  return _createClause;
}

function format(label, message, callback, options) {
  var command = 'describe';

  label = gwtLabel(label, options);

  if (typeof message === 'function') { // describe!
    callback = message;
    message = label;
  } else {                             // it!
    message = label + message;
    command = 'it';
  }

  return helpers.isPending(command, message, callback);
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

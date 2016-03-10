'use strict';

var colors = require('colors/safe');

var helpers = require('./helpers');

function createClause(mochaInstance, label, options) {
  options = options || {};

  label = gwtLabel(label, options);

  function _createClause(message, callback) {
    var formatted = format(label, message, callback);
    helpers.describeItNested(mochaInstance, formatted.command, formatted.message, formatted.callback, options);
  }
  _createClause.only = function (message, callback) {
    var formatted = format(label, message, callback);
    helpers.describeItNested.only(mochaInstance, formatted.command, formatted.message, formatted.callback, options);
  };
  _createClause.skip = function (message, callback) {
    var formatted = format(label, message, callback);
    helpers.describeItNested.skip(mochaInstance, formatted.command, formatted.message, formatted.callback, options);
  };

  return _createClause;
}

function format(label, message, callback) {
  var command = 'describe';

  if (typeof message === 'function') { // describe!
    callback = message;
    message = label;
  } else { // it!
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

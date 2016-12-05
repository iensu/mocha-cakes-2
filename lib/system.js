'use strict';

var colors = require('colors/safe');

var helpers = require('./helpers');

function system(mochaInstance, options) {
  options = options || {};

  function _system (message, callback) {
    var formatted = format(message, callback, options);
    helpers.describeItNested(mochaInstance, formatted.command, formatted.label, formatted.callback, options);
  }
  _system.only = function (message, callback) {
    var formatted = format(message, callback, options);
    helpers.describeItNested.only(mochaInstance, formatted.command, formatted.label, formatted.callback, options);
  };
  _system.skip = function (message, callback) {
    var formatted = format(message, callback, options);
    helpers.describeItNested.skip(mochaInstance, formatted.command, formatted.label, formatted.callback, options);
  };

  return _system;
}

function format(message, callback, options) {
  var label = ' [system] ';

  if (options.style) {
    label = colors.grey.italic(label);
  }

  var formatted = {};
  if (typeof message === 'function') {
    formatted = helpers.isPending('describe', '', message);
  } else {
    formatted = helpers.isPending('it', message, callback);
    if (options.style && !callback) message = colors.cyan(message);
  }

  formatted.label = label + formatted.message;
  return formatted;
}

module.exports = system;

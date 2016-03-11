'use strict';

var _ = require('lodash');
var colors = require('colors');

function reporter(config) {
  var SUPPORTED_REPORTERS = ['doc', 'spec'];
  var reporter = config.reporter || config.R;
  var specifiedReporter = _.find(SUPPORTED_REPORTERS, function (r) {
    return reporter === r;
  });
  return specifiedReporter || 'spec';
}

function isPending(command, message, callback) {
  if (!callback || callback.toString === (function () {}).toString()) { // no or blank callback
    command = 'it';
    message = '◊ ' + message.replace(/\s\s+/, ' ').trim() + ' (pending)';
    callback = null;
  }
  return {
    command: command,
    message: message,
    callback: callback
  };
}

function describeItNested(mochaInstance, command, message, callback, options) {
  mochaInstance.describe('', nestedFunc(mochaInstance, command, message, callback));
}
describeItNested.only = function (mochaInstance, command, message, callback, options) {
  // only relies on grep against test labels,
  // using non-breaking space as describe label to enable `only`
  mochaInstance.describe.only(' ', nestedFunc(mochaInstance, command, message, callback));
};
describeItNested.skip = function (mochaInstance, command, message, callback, options) {
  mochaInstance.describe.skip('', nestedFunc(mochaInstance, command, message, callback));
};

function nestedFunc(mochaInstance, command, message, callback) {
  if (command === 'it') {
    return function () { mochaInstance.it(message, callback); };
  }

  return function () {
    mochaInstance.describe('', function () {
      mochaInstance.describe(message, callback);
    });
  };
}

function mochaFuncFactory(mochaFn, formatFn) {
  return function () {
    var formatted = formatFn.apply(null, [].slice.call(arguments));
    mochaFn(formatted.message, formatted.callback);
  };
}

module.exports = {
  reporter: reporter,
  isPending: isPending,
  describeItNested: describeItNested,
  mochaFuncFactory: mochaFuncFactory
};

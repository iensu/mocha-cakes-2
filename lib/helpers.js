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
  var label = nestedLabel(options);

  return mochaInstance.describe(label, function () {
    if (command === 'it') {
      return mochaInstance.it(message, callback);
    }

    return mochaInstance.describe('', function () {
      mochaInstance.describe(message, callback);
    });
  });
}

function nestedLabel(options) {
  if (options.reporter === 'doc') {
    return '';
  }

  var label = '◦';

  if (options.style) {
    var color = options.dark && colors.black || colors.green;
    label = color(label);
  }

  return label;
}

module.exports = {
  reporter: reporter,
  isPending: isPending,
  describeItNested: describeItNested
};

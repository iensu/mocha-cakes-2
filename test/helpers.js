'use strict';

var Mocha = require('mocha');
var Promise = require('bluebird');
var execFile = Promise.promisify(require('child_process').execFile);
var path = require('path');

var testEnv = Object.assign({}, process.env, { NODE_PATH: __dirname });

var defaultOpts = {
  reporter: 'spec'
};

var formatRegexp = /%[ds]/

var interfaces = {
  cli: function(file, opts) {
    opts = Object.assign({}, defaultOpts, opts);
    var args = [
      '--require', path.join(__dirname, '../mocha-cakes.js'),
      '--ui', 'mocha-cakes',
      '--reporter', opts.reporter,
      path.join(__dirname, file)
    ];
    return execFile('mocha', args, { env: testEnv });
  },

  api: function(file, opts) {
    return new Promise(function(resolve) {
      opts = Object.assign({}, defaultOpts, opts);

      // The set up from requiring mocha-cakes and running chai.should() in `run-api.js`
      // is inherited here so we don't need to set them up for each file we run.

      var mocha = new Mocha({
        ui: 'mocha-cakes-2',
        reporter: opts.reporter,
        // Since we're intercepting the console messages before they're formatted
        // we would get the color strings in the output, but that doesn't happen
        // in the CLI output since the colors are formatted and won't appear in the
        // strings, so we disable colors here so we don't have to strip them from
        // the output, and we can use the same test assertions with both interfaces.
        useColors: false
      });

      mocha.addFile(path.join(__dirname, file));

      // Override console.log() so we can get the output from the reporter.
      var logs = [];
      var originalLog = console.log
      console.log = function() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length < 2) {
          logs.push(args[0] || '');
        } else {
          var str = args.reduce(function(str, arg) {
            if (formatRegexp.test(str)) {
              return str.replace(formatRegexp, arg);
            }
            return str + ' ' + arg;
          });
          logs.push(str);
        }
      }

      // Mocha.run() will store the 'useColors' option internally, outside of the
      // options we've set for this instance, so if the Mocha instance that's
      // running this has a different 'useColors' value it won't be restored.
      var previousUseColors = Mocha.reporters.Base.useColors;

      mocha.run(function() {
        console.log = originalLog;
        Mocha.reporters.Base.useColors = previousUseColors;
        resolve(logs.join('\n'));
      });
    });
  }
}

function execTestFile(file, opts) {
  var interfaceName = process.env.MOCHA_INTERFACE || 'cli';
  var func = interfaces[interfaceName];
  if (!func) {
    var actual = typeof interfaceName !== 'undefined' ? JSON.stringify(interfaceName) : 'undefined';
    var valid = Object.keys(interfaces).join(', ');
    throw new Error('The MOCHA_INTERFACE environment variable is set to ' + actual + ', valid values are: ' + valid);
  }
  return func(file, opts);
}

module.exports = {
  execTestFile: execTestFile
};

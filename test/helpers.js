'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var execFile = Promise.promisify(require('child_process').execFile);

var testEnv = _.assign({}, process.env, { NODE_PATH: __dirname });

function execTestFile(file, opts) {
  opts = _.assign({ reporter: 'doc' }, opts);
  var args = ['--reporter', opts.reporter, __dirname + '/' + file];
  return execFile('mocha', args, { env: testEnv });
}

module.exports = {
  execTestFile: execTestFile
};

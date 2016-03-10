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

function fakeMocha() {

  var describe = function () {};
  describe.skip = function () {};
  describe.only = function () {};

  var it = function () {};
  it.skip = function () {};
  it.only = function () {};

  return {
    describe: describe,
    it: it
  };
}

module.exports = {
  execTestFile: execTestFile,
  fakeMocha: fakeMocha
};

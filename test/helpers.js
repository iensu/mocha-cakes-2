'use strict';

var Promise = require('bluebird');
var execFile = Promise.promisify(require('child_process').execFile);
var path = require('path');

var testEnv = Object.assign({}, process.env, { NODE_PATH: __dirname });

function execTestFile(file, opts) {
  opts = Object.assign({ reporter: 'spec' }, opts);
  var args = [
    '--require', path.join(__dirname, '../mocha-cakes.js'),
    '--ui', 'mocha-cakes',
    '--reporter', opts.reporter,
    path.join(__dirname, file)
  ];
  return execFile('mocha', args, { env: testEnv });
}

module.exports = {
  execTestFile: execTestFile
};

'use strict';

var _ = require('lodash');

var MochaInterface = require('./lib/mocha-interface');
var describe = require('./lib/describe');
var feature = require('./lib/feature');
var gwtabiClause = require('./lib/gwtabi-clause');
var helpers = require('./lib/helpers');
var scenario = require('./lib/scenario');
var system = require('./lib/system');

var argv = require('minimist')(process.argv);

var mocha = new MochaInterface(argv);
var reporter = helpers.reporter(argv);

var options = {
  label: true,
  style: reporter !== 'doc',
  reporter: reporter
};

var api = {
  Feature: feature(mocha, _.assign({ style: true, whitespace: true }, options)),
  Scenario: scenario(mocha, _.assign({ style: true, whitespace: true }, options)),

  Given: gwtabiClause(mocha, 'Given: ', options),
  When: gwtabiClause(mocha, ' When: ', options),
  Then: gwtabiClause(mocha, ' Then: ', options),
  And: gwtabiClause(mocha, '  And: ', _.assign({ dark: true }, options)),
  But: gwtabiClause(mocha, '  But: ', _.assign({ dark: true }, options)),
  I: gwtabiClause(mocha, '  I ', _.assign({ white: true }, options)),
  Describe: describe(mocha, options),
  System: system(mocha, options)
};

module.exports = api;

Object.keys(api).forEach(function (key) {
  global[key] = api[key];
});

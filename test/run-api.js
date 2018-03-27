'use strict';

var Mocha = require('mocha');
var chai = require('chai');

require('../mocha-cakes');

chai.should();

var mocha = new Mocha({
  ui: 'mocha-cakes-2',
  reporter: 'spec'
});

mocha.addFile('test/feature/tests.js');

mocha.run(function(failureCount) {
  process.on("exit", function() {
    process.exit(failureCount);
  });
});

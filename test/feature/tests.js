'use strict';

var execTestFile = require('./../helpers').execTestFile;

describe('Mocha Cakes Feature with `doc` Reporter', function () {

  describe('A basic feature test', function () {

    var output;

    before(function () {
      return execTestFile('feature/sample-tests/simple-feature-test.js')
        .then(function (result) {
          output = result;
        });
    });

    it('should have the correct `Feature` title', function () {
      output.should.contain('Feature: Mocha Cakes');
    });

    it('should have the correct `Scenario` title', function () {
      output.should.contain('Scenario: Testing mocha cakes');
    });

    it('should have the correct `Given` clause', function () {
      output.should.contain('✓ Given that 1 + 1 is 2');
    });

    it('should have the correct `And` clause', function () {
      output.should.contain('✓ And 2 + 2 is 4');
    });

    it('should have the correct `But` clause', function () {
      output.should.contain('✓ But 2 + 3 is not 4');
    });

    it('should have the correct `When` clause', function () {
      output.should.contain('✓ When something is true');
    });

    it('should have the correct `Then` clause', function () {
      output.should.contain('✓ Then everything should be ok');
    });
  });

  describe('A feature test with skipped scenario', function () {

    var output;

    before(function () {
      return execTestFile('feature/sample-tests/skipped-tests.js')
        .then(function (result) {
          output = result;
        });
    });

    it("should have 6 pending tests", () => {
      output.should.contain('4 passing');
      output.should.contain('6 pending');
    });

    it("should skip all tests in a skipped Scenario", () => {
      output.should.contain('- Given test 1');
      output.should.contain('- And test 2');
      output.should.contain('- But test 3');
      output.should.contain('- When test 4');
      output.should.contain('- Then test 5');
    });

    it("should be able to skip individual tests", () => {
      output.should.contain('- But test 8');
    });
  });

  describe('A feature test with exclusive Scenario', function () {

    var output;

    before(function () {
      return execTestFile('feature/sample-tests/scenario-with-only-test.js')
        .then(function (result) {
          output = result;
        });
    });

    it("should only run the specified scenario", () => {
      var expected = [
        'Feature: Mocha Cakes',
        'Scenario: Exclusive Scenario',
        '✓ Given test 1',
        '✓ And test 2',
        '✓ But test 3',
        '✓ When test 4',
        '✓ Then test 5'
      ];
      const formatted = output.trim().split('\n').map(function (s) {
        return s.trim();
      }).slice(0, 7);

      formatted.should.eql(expected);
      output.should.contain('5 passing');
    });
  });

  describe('A feature test with exclusive test', function () {

    var output;

    before(function () {
      return execTestFile('feature/sample-tests/single-only-test.js')
        .then(function (result) {
          output = result;
        });
    });

    it("should only run the specified test", () => {
      output.should.contain('Feature: Mocha Cakes');
      output.should.contain('Scenario: Exclusive test');
      output.should.contain('✓ Given test 1');
      output.should.contain('1 passing');
    });
  });
});

'use strict';

var execTestFile = require('./../helpers').execTestFile;

describe('Mocha Cakes', function () {

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

    it("should have 6 pending tests", function () {
      output.should.contain('4 passing');
      output.should.contain('6 pending');
    });

    it("should skip all tests in a skipped Scenario", function () {
      output.should.contain('- Given test 1');
      output.should.contain('- And test 2');
      output.should.contain('- But test 3');
      output.should.contain('- When test 4');
      output.should.contain('- Then test 5');
    });

    it("should be able to skip individual tests", function () {
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

    it("should only run the specified scenario", function () {
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

    it('should only run the specified test', function () {
      output.should.contain('Feature: Mocha Cakes');
      output.should.contain('Scenario: Exclusive test');
      output.should.contain('✓ Given test 1');
      output.should.contain('1 passing');
    });
  });

  describe('A Scenario with `before` and `after` clauses', function () {

    var output;

    before(function () {
      return execTestFile('feature/sample-tests/before-and-after-test.js')
        .then(function (result) {
          output = result;
        });
    });

    it('should execute the before clause before the first test clause', function () {
      output.should.contain('before clause');

      var scenarioIndex = output.indexOf('Scenario:');
      var beforeIndex = output.indexOf('before clause');
      var firstTestClauseIndex = output.indexOf('Given');

      scenarioIndex.should.be.below(beforeIndex);
      beforeIndex.should.be.below(firstTestClauseIndex);
    });

    it('should execute the after clause after the final test clause', function () {
      output.should.contain('after clause');

      var finalTestClauseIndex = output.indexOf('Then');
      var afterIndex = output.indexOf('after clause');

      finalTestClauseIndex.should.be.below(afterIndex);
    });
  });

  describe("A Scenario with beforeEach and afterEach clauses", function () {

    var output;

    before(function () {
      return execTestFile('feature/sample-tests/beforeEach-and-afterEach-test.js')
        .then(function (result) {
          output = result;
        });
    });

    it('should execute the beforeEach clause before each test clause', function () {
      var pattern = /beforeEach clause/g;

      output.match(pattern).length.should.equal(5);

      var testClauses = output.split(pattern);
      testClauses[0].should.contain('Scenario:');
      testClauses[1].should.contain('Given');
      testClauses[2].should.contain('And');
      testClauses[3].should.contain('But');
      testClauses[4].should.contain('When');
      testClauses[5].should.contain('Then');
    });

    it('should execute the afterEach clause after the final test clause', function () {
      var pattern = /afterEach clause/g;

      output.match(pattern).length.should.equal(5);

      var testClauses = output.split(pattern);
      testClauses[0].should.contain('Given');
      testClauses[1].should.contain('And');
      testClauses[2].should.contain('But');
      testClauses[3].should.contain('When');
      testClauses[4].should.contain('Then');
    });
  });

  describe('Lower-case aliases', function () {
    var output;

    before(function () {
      return execTestFile('feature/sample-tests/lower-case-aliases.js')
        .then(function (result) {
          output = result;
        });
    });

    it('should have the correct `feature` title', function () {
      output.should.contain('Feature: Mocha Cakes');
    });

    it('should have the correct `scenario` title', function () {
      output.should.contain('Scenario: Testing mocha cakes');
    });

    it('should have the correct `given` clause', function () {
      output.should.contain('✓ Given that 1 + 1 is 2');
    });

    it('should have the correct `and` clause', function () {
      output.should.contain('✓ And 2 + 2 is 4');
    });

    it('should have the correct `but` clause', function () {
      output.should.contain('✓ But 2 + 3 is not 4');
    });

    it('should have the correct `when` clause', function () {
      output.should.contain('✓ When something is true');
    });

    it('should have the correct `then` clause', function () {
      output.should.contain('✓ Then everything should be ok');
    });
  });
});

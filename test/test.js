'use strict';

var cheerio = require('cheerio');

var execTestFile = require('./helpers').execTestFile;

describe('Mocha Cakes Feature with `doc` Reporter', function () {

  describe('A basic feature test', function () {

    var $;

    before(function () {
      return execTestFile('sample-tests/simple-feature-test.js')
        .then(function (result) {
          $ = cheerio.load(result);
        });
    });

    it('should have the correct `Feature` title', function () {
      var featureTitle = $('section:root > h1').text().trim();
      featureTitle.should.equal('Feature: Mocha Cakes');
    });

    it('should have the correct `Scenario` title', function () {
      var scenarioTitle = $('section:root > dl > section > h1').text().trim();
      scenarioTitle.should.equal('Scenario: Testing mocha cakes');
    });

    it('should have the correct `Given` declaration', function () {
      var given = $('section:root > dl > section > dl > section')[0];
      $(given).find('dt').text().trim().should.equal('Given: that 1 + 1 is 2');
      $(given).find('dd > pre > code').text().should.equal('(1 + 1).should.equal(2);');
    });

    it('should have the correct `And` clause', function () {
      var and = $('section:root > dl > section > dl > section')[1];
      $(and).find('dt').text().trim().should.equal('And: 2 + 2 is 4');
      $(and).find('dd > pre > code').text().should.equal('(2 + 2).should.equal(4);');
    });

    it('should have the correct `But` clause', function () {
      var but = $('section:root > dl > section > dl > section')[2];
      $(but).find('dt').text().trim().should.equal('But: 2 + 3 is not 4');
      $(but).find('dd > pre > code').text().should.equal('(2 + 3).should.not.equal(4);');
    });

    it('should have the correct `When` clause', function () {
      var when = $('section:root > dl > section > dl > section')[3];
      $(when).find('dt').text().trim().should.equal('When: something is true');
      $(when).find('dd > pre > code').text().should.equal('true.should.equal(true);');
    });

    it('should have the correct `Then` clause', function () {
      var then = $('section:root > dl > section > dl > section')[4];
      $(then).find('dt').text().trim().should.equal('Then: everything should be ok');
      $(then).find('dd > pre > code').text().should.equal('"everything".should.be.ok;');
    });
  });
});

'use-strict';

beforeEachScenario(function() {
  console.log('Global beforeEachScenario');
});

afterEachScenario(function() {
  console.log('Global afterEachScenario');
});

beforeEachFeature(function() {
  console.log('Global beforeEachFeature');
});

afterEachFeature(function() {
  console.log('Global afterEachFeature');
});

Feature('Mocha Cakes', function () {

  beforeEachFeature(function() {
    console.log('Feature internal beforeEachFeature');
  });

  afterEachFeature(function() {
    console.log('Feature internal afterEachFeature');
  });

  beforeEachScenario(function() {
    console.log('Feature internal beforeEachScenario');
  });

  afterEachScenario(function() {
    console.log('Feature internal afterEachScenario');
  });

  Scenario('Testing mocha cakes', function () {

    beforeEachScenario(function() {
      console.log('Scenario internal beforeEachScenario');
    });

    afterEachScenario(function() {
      console.log('Scenario internal afterEachScenario');
    });

    When('something is true', function () {
      true.should.equal(true);
    });

    Then('everything should be ok', function () {
      "everything".should.be.ok;
    });
  });

  Scenario('Testing mocha cakes again', function () {

    When('something is true', function () {
      true.should.equal(true);
    });

    Then('everything should be ok', function () {
      "everything".should.be.ok;
    });
  });
});

Feature('Mocha Cakes 2', function () {

  Scenario('Testing mocha cakes in negative', function () {

    When('something is false', function () {
      false.should.equal(false);
    });

    Then('everything should be ok', function () {
      "everything".should.be.ok;
    });
  });
});


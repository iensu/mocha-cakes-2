'use strict';

Feature('Mocha Cakes', function () {

  Scenario.only('Exclusive Scenario', function () {

    Given('test 1', function () {
      (1 + 1).should.equal(2);
    });
    And('test 2', function () {
      (2 + 2).should.equal(4);
    });
    But('test 3', function () {
      (2 + 3).should.not.equal(4);
    });

    When('test 4', function () {
      true.should.equal(true);
    });

    Then('test 5', function () {
      "everything".should.be.ok;
    });
  });

  Scenario('Some Scenario', function () {

    Given('test 6', function () {
      (1 + 1).should.equal(2);
    });
    And('test 7', function () {
      (2 + 2).should.equal(4);
    });
    But('test 8', function () {
      (2 + 3).should.not.equal(4);
    });

    When('test 9', function () {
      true.should.equal(true);
    });

    Then('test 10', function () {
      "everything".should.be.ok;
    });
  });
});

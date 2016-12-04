'use-strict';

Feature('Mocha Cakes', function () {

  Scenario('Testing mocha cakes', function () {

    beforeEach(function () {
      console.log('beforeEach clause');
    });

    afterEach(function () {
      console.log('afterEach clause');
    })

    Given('that 1 + 1 is 2', function () {
      (1 + 1).should.equal(2);
    });
    And('2 + 2 is 4', function () {
      (2 + 2).should.equal(4);
    });
    But('2 + 3 is not 4', function () {
      (2 + 3).should.not.equal(4);
    });

    When('something is true', function () {
      true.should.equal(true);
    });

    Then('everything should be ok', function () {
      "everything".should.be.ok;
    });
  });
});

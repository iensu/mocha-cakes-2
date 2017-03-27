'use-strict';

feature('Mocha Cakes', function () {

  scenario('Testing mocha cakes', function () {

    given('that 1 + 1 is 2', function () {
      (1 + 1).should.equal(2);
    });
    and('2 + 2 is 4', function () {
      (2 + 2).should.equal(4);
    });
    but('2 + 3 is not 4', function () {
      (2 + 3).should.not.equal(4);
    });

    when('something is true', function () {
      true.should.equal(true);
    });

    then('everything should be ok', function () {
      "everything".should.be.ok;
    });
  });
});

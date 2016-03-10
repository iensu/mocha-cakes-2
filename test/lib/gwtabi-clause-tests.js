'use strict';

var sinon = require('sinon');

var gwtabiClause = require('../../lib/gwtabi-clause');
var fakeMocha = require('../helpers').fakeMocha();
var helpers = require('../../lib/helpers');

describe('gwtabiClause', function () {

  var dummyFunction = function () { console.log('I am a dummy function') };

  beforeEach(function () {
    sinon.spy(fakeMocha, 'describe');
    sinon.spy(fakeMocha, 'it');
    sinon.spy(helpers, 'describeItNested');
  });

  afterEach(function () {
    fakeMocha.describe.restore();
    fakeMocha.it.restore();
    helpers.describeItNested.restore();
  });

  it('should call `describe`', function () {
    gwtabiClause(fakeMocha, 'LABEL: ')('some test', dummyFunction);

    fakeMocha.describe.should.have.been.called;
  });

  it('should nest the provided arguments', function () {
    var command = 'it',
        label = 'LABEL: ',
        message = 'some text';

    gwtabiClause(fakeMocha, label)(message, dummyFunction);

    helpers.describeItNested.should.have.been.calledWith(fakeMocha, command, label + message, dummyFunction);
  });

  describe('gwtabiClause.only', () => {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'only');
      sinon.spy(helpers.describeItNested, 'only');
    });

    afterEach(function () {
      fakeMocha.describe.only.restore();
      helpers.describeItNested.only.restore();
    });

    it('should call `describe.only`', function () {
      gwtabiClause(fakeMocha, 'LABEL: ').only('some test', dummyFunction);

      fakeMocha.describe.only.should.have.been.called;
    });

    it('should nest the provided arguments', function () {
      var command = 'it',
          label = 'LABEL: ',
          message = 'some text';

      gwtabiClause(fakeMocha, label).only(message, dummyFunction);

      helpers.describeItNested.only.should.have.been.calledWith(fakeMocha, command, label + message, dummyFunction);
    });
  });

  describe('gwtabiClause.skip', () => {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'skip');
      sinon.spy(helpers.describeItNested, 'skip');
    });

    afterEach(function () {
      fakeMocha.describe.skip.restore();
      helpers.describeItNested.skip.restore();
    });

    it('should call `describe.skip`', function () {
      gwtabiClause(fakeMocha, 'LABEL: ').skip('some test', dummyFunction);

      fakeMocha.describe.skip.should.have.been.called;
    });

    it('should nest the provided arguments', function () {
      var command = 'it',
          label = 'LABEL: ',
          message = 'some text';

      gwtabiClause(fakeMocha, label).skip(message, dummyFunction);

      helpers.describeItNested.skip.should.have.been.calledWith(fakeMocha, command, label + message, dummyFunction);
    });
  });
});

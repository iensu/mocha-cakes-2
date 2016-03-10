'use strict';

var sinon = require('sinon');

var system = require('../../lib/system');
var fakeMocha = require('../helpers').fakeMocha();
var helpers = require('../../lib/helpers');

describe('system', function () {

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
    system(fakeMocha)('some test', dummyFunction);

    fakeMocha.describe.should.have.been.called;
  });

  it('should nest the provided arguments', function () {
    var command = 'it',
        message = 'some text';

    system(fakeMocha)(message, dummyFunction);

    helpers.describeItNested.should.have.been.calledWith(fakeMocha, command, ' [system] ' + message, dummyFunction);
  });

  describe('system.only', () => {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'only');
      sinon.spy(helpers.describeItNested, 'only');
    });

    afterEach(function () {
      fakeMocha.describe.only.restore();
      helpers.describeItNested.only.restore();
    });

    it('should call `describe.only`', function () {
      system(fakeMocha).only('some test', dummyFunction);

      fakeMocha.describe.only.should.have.been.called;
    });

    it('should nest the provided arguments', function () {
      var command = 'it',
          message = 'some text';

      system(fakeMocha).only(message, dummyFunction);

      helpers.describeItNested.only.should.have.been.calledWith(fakeMocha, command, ' [system] ' + message, dummyFunction);
    });
  });

  describe('system.skip', () => {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'skip');
      sinon.spy(helpers.describeItNested, 'skip');
    });

    afterEach(function () {
      fakeMocha.describe.skip.restore();
      helpers.describeItNested.skip.restore();
    });

    it('should call `describe.skip`', function () {
      system(fakeMocha).skip('some test', dummyFunction);

      fakeMocha.describe.skip.should.have.been.called;
    });

    it('should nest the provided arguments', function () {
      var command = 'it',
          message = 'some text';

      system(fakeMocha).skip(message, dummyFunction);

      helpers.describeItNested.skip.should.have.been.calledWith(fakeMocha, command, ' [system] ' + message, dummyFunction);
    });
  });
});

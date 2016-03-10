'use strict';

var sinon = require('sinon');

var scenario = require('../../lib/scenario.js');
var fakeMocha = require('../helpers.js').fakeMocha();

describe('scenario', function () {

  var dummyFunction = function () { console.log('I am a dummy function') };

  beforeEach(function () {
    sinon.spy(fakeMocha, 'describe');
    sinon.spy(fakeMocha, 'it');
  });

  afterEach(function () {
    fakeMocha.describe.restore();
    fakeMocha.it.restore();
  });

  it('should call describe', function () {

    var label = 'I am a scenario';

    scenario(fakeMocha)(label, dummyFunction);

    fakeMocha.it.should.not.have.been.called;
    fakeMocha.describe.should.have.been.called;
  });

  it('should prepend a scenario label', function () {
    var label = 'prepend and append';

    scenario(fakeMocha)(label, dummyFunction);

    fakeMocha.describe.should.have.been.calledWith('\n    Scenario: ' + label);
  });

  it('should send along the provided test function', function () {
    scenario(fakeMocha)('blaha', dummyFunction);

    fakeMocha.describe.should.have.been.calledWith('\n    Scenario: blaha', dummyFunction);
  });

  it('should skip scenario if first argument is falsy', function () {
    var label = 'some scenario';
    scenario(fakeMocha)(false, label, dummyFunction);

    var expectedLabel = '\n    (skipped) ' + label;
    var emptyFunc = sinon.match(function (val) {
      return val.toString() === (function () {}).toString();
    });
    fakeMocha.describe.should.have.been.calledWith(expectedLabel, emptyFunc);
  });

  describe('scenario.only', () => {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'only');
    });

    afterEach(function () {
      fakeMocha.describe.only.restore();
    });

    it('should NOT call describe', function () {
      var label = 'only me';
      scenario(fakeMocha).only(label, dummyFunction);

      fakeMocha.describe.should.not.have.been.called;
    });

    it('should call describe.only', function () {
      var label = 'only me';
      scenario(fakeMocha).only(label, dummyFunction);

      fakeMocha.describe.only.should.have.been.calledWith('\n    Scenario: ' + label, dummyFunction);
    });
  });

  describe('scenario.skip', () => {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'skip');
    });

    afterEach(function () {
      fakeMocha.describe.skip.restore();
    });

    it('should NOT call describe', function () {
      var label = 'skip me';
      scenario(fakeMocha).skip(label, dummyFunction);

      fakeMocha.describe.should.not.have.been.called;
    });

    it('should call describe.skip', function () {
      var label = 'skip me';
      scenario(fakeMocha).skip(label, dummyFunction);

      fakeMocha.describe.skip.should.have.been.calledWith('\n    Scenario: ' + label, dummyFunction);
    });
  });
});

'use strict';

var sinon = require('sinon');

var feature = require('../../lib/feature.js');
var fakeMocha = require('../helpers.js').fakeMocha();

describe('feature', function () {

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

    var label = 'I am a feature';

    feature(fakeMocha)(label, dummyFunction);

    fakeMocha.it.should.not.have.been.called;
    fakeMocha.describe.should.have.been.called;
  });

  it('should prepend \'Feature: \' and append a newline to the label', function () {
    var label = 'prepend and append';

    feature(fakeMocha)(label, dummyFunction);

    fakeMocha.describe.should.have.been.calledWith('Feature: ' + label);
  });

  it('should send along the provided test function', function () {
    feature(fakeMocha)('blaha', dummyFunction);

    fakeMocha.describe.should.have.been.calledWith('Feature: blaha', dummyFunction);
  });

  describe('feature.only', function () {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'only');
    });

    afterEach(function () {
      fakeMocha.describe.only.restore();
    });

    it('should NOT call describe', function () {
      var label = 'only me';
      feature(fakeMocha).only(label, dummyFunction);

      fakeMocha.describe.should.not.have.been.called;
    });

    it('should call describe.only', function () {
      var label = 'only me';
      feature(fakeMocha).only(label, dummyFunction);

      fakeMocha.describe.only.should.have.been.calledWith('Feature: ' + label, dummyFunction);
    });
  });

  describe('feature.skip', function () {

    beforeEach(function () {
      sinon.spy(fakeMocha.describe, 'skip');
    });

    afterEach(function () {
      fakeMocha.describe.skip.restore();
    });

    it('should NOT call describe', function () {
      var label = 'skip me';
      feature(fakeMocha).skip(label, dummyFunction);

      fakeMocha.describe.should.not.have.been.called;
    });

    it('should call describe.skip', function () {
      var label = 'skip me';
      feature(fakeMocha).skip(label, dummyFunction);

      fakeMocha.describe.skip.should.have.been.calledWith('Feature: ' + label, dummyFunction);
    });
  });
});

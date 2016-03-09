'use strict';

var sinon = require('sinon');

var feature = require('../../lib/feature.js');

describe('feature', function () {

  var dummyFunction = function () { console.log('I am a dummy function') };
  var mockMocha = {
    describe: function () {},
    it: function () {}
  };

  beforeEach(function () {
    sinon.stub(mockMocha, 'describe');
    sinon.stub(mockMocha, 'it');
  });

  afterEach(function () {
    mockMocha.describe.restore();
    mockMocha.it.restore();
  });

  it('should call describe', function () {

    var label = 'I am a feature';

    feature(mockMocha)(label, dummyFunction);

    mockMocha.it.should.not.have.been.called;
    mockMocha.describe.should.have.been.called;
  });

  it('should prepend \'Feature: \' and append a newline to the label', function () {
    var label = 'prepend and append';

    feature(mockMocha)(label, dummyFunction);

    mockMocha.describe.should.have.been.calledWith('Feature: ' + label + '\n');
  });

  it('should send along the provided test function', function () {
    feature(mockMocha)('blaha', dummyFunction);

    mockMocha.describe.should.have.been.calledWith('Feature: blaha\n', dummyFunction);
  });
});

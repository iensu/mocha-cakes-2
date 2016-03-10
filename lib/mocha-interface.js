'use strict';

function MochaInterface(opts) {

  var isTdd = (opts.ui || opts.u) === 'tdd';

  var describeFnName = isTdd ? 'suite' : 'describe';
  var itFnName = isTdd ? 'test' : 'it';

  function describe() {
    global[describeFnName].apply(global, arguments);
  }
  describe.skip = function () {
    global[describeFnName].skip.apply(global, arguments);
  };
  describe.only = function () {
    global[describeFnName].only.apply(global, arguments);
  };
  return {
    describe: describe,
    it: function () {
      global[itFnName].apply(global, arguments);
    }
  };
}

module.exports = MochaInterface;

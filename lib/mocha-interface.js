'use strict';

function MochaInterface(opts) {

  var isTdd = (opts.ui || opts.u) === 'tdd';

  var _describe = isTdd ? 'suite' : 'describe';
  var _it = isTdd ? 'test' : 'it';

  return {
    describe: function () {
      global[_describe].apply(global, arguments);
    },
    it: function () {
      global[_it].apply(global, arguments);
    }
  };
}

module.exports = MochaInterface;

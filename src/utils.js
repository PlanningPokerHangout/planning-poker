var _ = require('underscore');

function grouper(array, n) {
  function splitter(memo, item) {
    memo = memo || [];
    var last = _.last(memo);

    if (last === undefined || last.length === n) {
      last = [];
      memo.push(last);
    }

    last.push(item);

    return memo;
  }

  return _.reduce(array, splitter, []);
}

exports.grouper = grouper;

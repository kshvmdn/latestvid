'use strict';

const utils = require('./utils');

const run = function(user, toDl) {
  utils.getLatest(user)
    .then(url => {
      let task = toDl ? utils.download : utils.open;
      return task(url, user);
    })
    .catch(e => {
      return utils.exit(e.message);
    });
};

module.exports.run = args => {
  return run(args.user, args.toDl);
};

'use strict';

const utils = require('./utils');

const run = function(user, toDl) {
  utils.getLatest(user)
    .then(url => {
      let task = toDl ? utils.download : utils.open;
      return task(url, user);
    })


'use strict';
const latestvid = require('../index');

module.exports = () => {
  latestvid.getLatest('nba')
    .then(url => {
      console.log(url);
      return latestvid.openUrl(url);
    })
    .catch(err => {
      console.error(err.message);
      return process.exit(1);
    });
};

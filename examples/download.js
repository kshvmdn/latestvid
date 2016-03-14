'use strict';
const latestvid = require('../index');

module.exports = () => {
  latestvid.getLatest('marquesbrownlee')
    .then(url => {
      console.log(url);
      return latestvid.downloadVideo(url);
    })
    .catch(err => {
      console.error(err.message);
      return process.exit(1);
    });
};

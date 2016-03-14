'use strict';
const fs = require('fs');
const open = require("open");
const os = require('os-homedir')();
const path = require('path');
const xray = require('x-ray')();
const youtubedl = require('youtube-dl');

module.exports.getLatest = user => {
  const url = `https://www.youtube.com/user/${user}/videos`;
  return new Promise((resolve, reject) => {
    xray(url, 'li.channels-content-item a@href')((err, body) => {
      if (err || body === undefined) {
        reject(new Error(`User ${user.toUpperCase()} doesn\'t exist or has no videos.`));
      }
      resolve(body);
    });
  });
};

module.exports.openUrl = url => open(url);

module.exports.downloadVideo = url => {
  const video = youtubedl(url, ['-f', '22']); // 1080p mp4
  let size = 0;
  video.on('info', info => {
    size = info.size;
    const file = path.join(os, 'Desktop', info._filename);
    video.pipe(fs.createWriteStream(file));
  });
  let pos = 0;
  video.on('data', chunk => {
    pos += chunk.length;
    if (size) {
      const percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(`${percent}%`);
    }
  });
  video.on('end', () => {
    console.log('\n');
  });
};

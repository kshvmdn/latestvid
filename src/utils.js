'use strict';

const fs = require('fs');
const open = require("open");
const os = require('os-homedir')();
const path = require('path');
const Promise = require('bluebird');
const Xray = require('x-ray'), xray = Xray();
const ytdl = require('youtube-dl');

var exit = function(msg) {
  console.log(msg);
  return process.exit(1);
}

var getLatestVideo = function(user) {
  let base = 'https://www.youtube.com/user/' + user + '/videos';
  return new Promise(function(resolve, reject) {
    xray(base, 'li.channels-content-item a@href')(function(err, body) {
      if (err || body == undefined)
        reject(new Error(`User ${user.toUpperCase()} doesn\'t exist or has no videos.`));
      resolve(body);
    });
  });
};

var openVideo = function(url, user) {
  console.log('Opening the latest " + user.toUpperCase() + " video...');
  open(url)
};

var downloadVideo = function(url, user) {
  console.log('Downloading the latest ' + user.toUpperCase() + ' video...');
  var video = ytdl(url, ['-f', '22']); // 1080p mp4
  var size = 0;
  video.on('info', function(info) {
    size = info.size;
    var file = path.join(os, 'Desktop', info._filename);
    video.pipe(fs.createWriteStream(file));
  });
  var pos = 0;
  video.on('data', function data(chunk) {
    pos += chunk.length;
    if (size) {
      var percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
  });
  video.on('end', function end() {
    console.log('\n');
  });
};

module.exports = {
  exit: exit,
  getLatest: getLatestVideo,
  open: openVideo,
  download: downloadVideo
};

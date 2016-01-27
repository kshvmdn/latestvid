#! /usr/bin/env node
"use strict";

const Xray = require("x-ray"), xray = Xray();
const open = require("open");
const Promise = require("bluebird");
const fs = require('fs');
const ytdl = require('youtube-dl');
const path = require('path');

var getLatestVid = function(user) {
  let base = "https://www.youtube.com/user/" + user + "/videos";
  return new Promise(function(resolve, reject) {
    xray(base, "li.channels-content-item a@href")(function(err, body) {
      if (err || body == undefined)
        reject();
      resolve(body);
    });
  });
}

var openVid = function(url) {
  console.log("Opening the latest " + ytUser.toUpperCase() + " video...");
  open(url);
}

var dlVid = function(url) {
  console.log("Downloading the latest " + ytUser.toUpperCase() + " video...");
  var video = ytdl(url, ['-f', '22']); // 1080p mp4
  var size = 0;
  video.on('info', function(info) {
    console.log(info);
    size = info.size;
    var file = path.join('~/Desktop', info._filename);
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
  })
}

let ytUser = process.argv[2] != undefined ? process.argv[2] : 'marquesbrownlee';
let download = Boolean(process.argv[3]);

getLatestVid(ytUser).then(function(url) {
  return (download) ? dlVid(url) : openVid(url);
  process.exit(0);
}).catch(function(e) {
  console.log("User " + ytUser.toUpperCase() + " doesn\'t exist or has no videos.");
  process.exit(1);
});

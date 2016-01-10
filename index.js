#! /usr/bin/env node
"use strict";

const Xray = require("x-ray"), xray = Xray();
const open = require("open");
const Promise = require("bluebird");

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

let ytUser = process.argv[2] != undefined ? process.argv[2] : 'marquesbrownlee';
getLatestVid(ytUser).then(function(url) {
  console.log("Opening the latest " + ytUser.toUpperCase() + " video...");
  open(url);
  process.exit(1);
}).catch(function(e) {
  console.log("User " + ytUser.toUpperCase() + " doesn\'t exist or has no videos.");
  process.exit(0);
});
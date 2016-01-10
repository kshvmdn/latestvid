#! /usr/bin/env node
"use strict";

const Xray = require("x-ray"), xray = Xray();
const open = require("open");
// const Promise = require("bluebird");

var getLatestVid = function(user) {
  var base = "https://www.youtube.com/user/" + user + "/videos";
  var prom = new Promise(function(resolve, reject) {
    xray(base, "li.channels-content-item a@href")(function(err, body) {
      if (!err && body != undefined)
        resolve(body);
      else
        reject(err);
    });
  });
  prom.then(function(url){
    console.log("Opening latest upload by user \"" + user + "\"...");
    open(url);
  }).catch(function() {
    console.log("User \"" + user + "\" doesn\'t exist or has no videos.");
  });
}

getLatestVid(process.argv[2]);

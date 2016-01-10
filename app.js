"use strict";
const Xray = require("x-ray"), xray = Xray();

var base_url = "https://www.youtube.com/user/" + process.argv[2] + "/videos";

xray(base_url, "li.channels-content-item a@href")(function(err, body) {
  console.log(body);
});
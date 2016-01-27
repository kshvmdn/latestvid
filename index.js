#! /usr/bin/env node
'use strict';

const meow = require('meow');
const latestvid = require('./latestvid');

const cli = meow(`
  Usage
    $ latestvid <user> <download_video>

  Options
    -u, --user      YouTube account
    -d, --download  Download or open
`);

if (cli.flags['u'] == undefined) {
  console.log('User not provided, run --help for more info.'); 
  process.exit(1);
}

let user = cli.flags['u'];
let dl = Boolean(cli.flags['d']);

latestvid.getLatest(user).then(function(url) {
  return dl ? latestvid.download(url, user) : latestvid.open(url, user);
  process.exit(0);
}).catch(function(e) {
  console.log("User " + user.toUpperCase() + " doesn\'t exist or has no videos.");
  process.exit(1);
});

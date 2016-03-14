'use strict';
const minimist = require('minimist');
const latestvid = require('./');
const version = require('./package.json').version;

const defaults = {
  boolean: [
    'help',
    'version',
    'download'
  ],
  alias: {
    h: 'help',
    v: 'version',
    u: 'user',
    d: 'download'
  },
  default: {
    help: false,
    version: false,
    download: false,
    user: ''
  }
};
const help = `
  Usage: latestvid [OPTIONS]
    Open/download the most recent video from any YouTube account.
  Options:
    -h --help         Display this help dialog
    -v --version      Display current version
    -d --download     Download latest video instead of opening
    -u --user            YouTube username
  Example:
    $ latestvid -u marquesbrownlee      # open latest MKBHD video
    $ latestvid -u marquesbrownlee -d   # download latest MKBHD video
`;

exports.stdout = process.stdout;
exports.stderr = process.stderr;
exports.exit = process.exit;

exports.parse = argv => minimist(argv, defaults);


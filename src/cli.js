'use strict';

const meow = require('meow');
const version = require('../package.json').version;
const cli = meow(`
  Usage: latestvid [OPTIONS]

  Examples:
    $ latestvid -u marquesbrownlee      # to open latest MKBHD video
    $ latestvid -u marquesbrownlee -d   # to DL latest MKBHD video

  Options:
    -h, --help      Display this help message
    -v, --version   Display current version
    -u, --user      YouTube account to view/dl latest video for
    -d, --download  Include to download video instead of opening
`);

const flags = cli.flags;

let error = {
  'msg': null,
  'code': 0
};

const exit = function(msg) {
  error.msg = msg;
  error.code = 1;
};

const exists = function(var_) {
  return var_ !== undefined && typeof(var_) === 'boolean' && String(var_) !== '';
};

if (Object.keys(flags).length == 0 || exists(flags['h'])) {
  exit(`${cli.help}`);
} else if (exists(flags['v'])) {
  exit(`latestvid v${version}`);
} else if (exists(flags['u']) || exists(flags['user'])) {
  exit(`Expected user account, run 'latestvid -h' for help.`);
}

let username = flags['u'] || flags['user'];
let download = Boolean(flags['d'] || flags['download']);

module.exports = {
  'user': username,
  'toDl': download,
  'error': error
};

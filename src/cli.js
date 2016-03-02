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


};

const exists = function(var_) {
  return var_ !== undefined && typeof(var_) === 'boolean' && String(var_) !== '';
};


let username = flags['u'] || flags['user'];
let download = Boolean(flags['d'] || flags['download']);

module.exports = {
  'user': username,
  'toDl': download,
};

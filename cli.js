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
    -u --user         YouTube username
  Example:
    $ latestvid -u marquesbrownlee      # open latest MKBHD video
    $ latestvid -u marquesbrownlee -d   # download latest MKBHD video
`;

exports.stdout = process.stdout;
exports.stderr = process.stderr;
exports.exit = process.exit;

exports.parse = argv => minimist(argv, defaults);

exports.validate = opts => {
  return new Promise((resolve, reject) => {
    if (!opts.help && !opts.version && (opts.user === '' || typeof (opts.user) === 'boolean')) {
      reject(new Error(`Expected user account, run 'latestvid -h' for help.`));
    }
    resolve(opts);
  });
};

exports.run = opts => {
  if (opts.help) {
    return exports.stdout.write(`${help}\n`);
  } else if (opts.version) {
    return exports.stdout.write(`latestvid v${version}\n`);
  }
  latestvid.getLatest(opts.user)
    .then(url => {
      let task;
      if (opts.download) {
        console.log(`Downloading latest ${opts.user.toUpperCase()} video...`);
        task = latestvid.downloadVideo;
      } else {
        console.log(`Opening latest ${opts.user.toUpperCase()} video...`);
        task = latestvid.openUrl;
      }
      return task(url);
    })
    .catch(error => {
      throw new Error(error);
    });
};

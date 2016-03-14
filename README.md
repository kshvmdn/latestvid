# Latest Vid
A module for interfacing with a YouTube accounts latest upload. Either use _globally_ through your command line or use at the module level. Available via [npm](https://www.npmjs.com/package/latestvid).

![LatestVid](http://i.imgur.com/JPtGUuE.gif)

### Usage

  Prerequisites: [Node v4.0.0](https://nodejs.org/en/blog/release/v4.0.0/)

  ##### CLI

  + Install
  
  ```
  $ npm install -g latestvid
  ```
  
  + Use

  ```
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
  ```

  ##### Module
  
  + Install

  ```
  $ npm install -S latestvid
  ```

  ```javascript
  const latestvid = require('latestvid');

  // to open video
  latestvid.getLatest('marquesbrownlee')
    .then(url => {
      console.log(url);
      return latestvid.openUrl(url);
    })
    .catch(e => {
      return console.error(e.message);
    });

  // to download video
  latestvid.getLatest('marquesbrownlee')
    .then(url => {
      console.log(url);
      return latestvid.downloadVideo(url);
    })
    .catch(e => {
      return console.error(e.message);
    });
  ```

### Contribute

Feel free to [open an issue](https://github.com/kshvmdn/latestvid/issues) or make a [pull request](https://github.com/kshvmdn/latestvid/pulls)!

Idea inspired by [`last-last-week`](https://www.npmjs.com/package/last-last-week).

# Latest Vid
A command-line tool to open or download the most recent [YouTube](http://youtube.com) video for any account. Available on [npm](https://www.npmjs.com/package/latestvid).

![LatestVid](http://i.imgur.com/JPtGUuE.gif)

### Setup
Prerequisites: [Node v4.0.0](https://nodejs.org/en/blog/release/v4.0.0/) (*for ES6*)
``` 
$ npm install -g latestvid
```

### Usage

Arguments:
```
-u, --user      YouTube account
-d, --download  Download video
```

Using LatestVid is __super__ simple, just run:
```bash
$ latestvid -u YOUTUBE_ACCOUNT
$ latestvid -u YOUTUBE_ACCOUNT -d # to download instead of opening
```

### Contribute

Feel free to [open an issue](https://github.com/kshvmdn/latestvid/issues) or make a [pull request](https://github.com/kshvmdn/latestvid/pulls)!

Idea inspired by [`last-last-week`](https://www.npmjs.com/package/last-last-week).

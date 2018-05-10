glob-map
===

Install
---

`npm install glob-map`

Usage
---

```javascript
const globMap = require('glob-map');

globMap('./files/*.md', file=>{
    console.log('file ',file);
});
```

API
---

### globMap(globs, options|cb, cb|undefined)

`globMap()` returns a promise on completion. The second argument can be an object, or a callback. The third argument can be a callback, or undefined.

### options

`options` should be an object.

See [globby](https://github.com/sindresorhus/globby) for most of the options. Also see [fast-glob](https://github.com/mrmlnc/fast-glob#options-1).

There is also an extra option `options.concurrency` which is the amount of concurrent runs of cb. See [p-map](https://github.com/sindresorhus/p-map).

### cb

`cb` should be a function that will run once for each file name, and be passed each one of those file names.

#### cb(filename)

For each file name `cb` is run.

Write code that will do work inside `cb`, and when that work is done return a promise. You can return whatever value from `cb`, but to take advantage of the async nature of `glob-map` returning a promise is advantageous.

Using an async function for `cb` is also valid.

```javascript
const globMap = require('glob-map');
const Promise = require('bluebird');
const readFile = require('fs').readFile;
const read = Promise.promisify(readFile);
//Some function that you create
const sendContent = require('./send_content');

globMap('./files/*', async file=>{
    let content = await read(file, 'utf8');
    return sendContent(content);
});
```

About
---

Under the hood `glob-map` uses [p-map](https://github.com/sindresorhus/p-map) to take advantage of concurrency.

This module codifies a super common pattern in file operations. :)

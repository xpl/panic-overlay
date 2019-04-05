# panic-overlay 💥✨[![Build Status](https://travis-ci.org/xpl/panic-overlay.svg?branch=master)](https://travis-ci.org/xpl/panic-overlay) [![NPM](https://img.shields.io/npm/v/panic-overlay.svg)](http://npmjs.com/package/panic-overlay)

A lightweight standalone plain JS alternative to `react-error-overlay` that is not tied to React / Webpack and works with any framework or even without one.

If you miss that thing from `create-react-app` but do not want to use that framework (e.g. you want to use [Parcel](https://parceljs.org/) as a lightweight alternative) — here you go!

## Features

- Displays runtime errors in browsers
- Full sourcemap support (shows original code, not transpiled)
- Clickable locations (opens in VS Code), [see the notes here](https://github.com/xpl/panic-overlay#vs-code-notes)
- Minimalistic implementation (bare DOM API), easily hackable
- Uncluttered stacktraces (collapses third party library calls)

## How It Looks

<img width="1420" alt="Screen Shot 2019-03-11 at 00 11 00" src="https://user-images.githubusercontent.com/1707/54091547-44332700-4392-11e9-81a8-8593c48980b1.png">

## Installation

```bash
npm install panic-overlay
```

```javascript
import 'panic-overlay' // should be the very first import in your app!
```

## Using Without A Bundler

```diff
-TO BE IMPLEMENTED
```

## Disabling Automatic Error Handling

Once imported, `panic-overlay` shows itself whenever an uncaught error occurs in a browser. You can disable that behavior:

```javascript
import panic from 'panic-overlay'

panic.configure ({ handleErrors: false })
```

## Showing Manually

```javascript
panic (error) // where error is either an instance of an Error or a string taken from Error.stack
```

## VS Code Notes

Currently there is a problem with automatically determining the full file paths, so you need to provide it manually, otherwise the error locations won't be clickable:

```javascript
import panic from 'panic-overlay'

panic.configure ({ projectRoot: '/full/path/to/my/project' })
```

## Custom Click Handler

You can intercept clicks on call stack entries. For the `entry` format, [see this](https://github.com/xpl/stacktracey#how-to).

```javascript
panic.configure ({
    stackEntryClicked (entry) {
        alert (`Clicked on ${entry.fileRelative}:${entry.line}:${entry.column}`)
    }
})
```

## TODO

- [ ] Implement parsing of React JSX errors ([see more here](https://github.com/parcel-bundler/parcel/issues/2765))

## Hacking

The `panic-overlay` is just a GUI for the [**`stacktracey`**](https://github.com/xpl/stacktracey) library that provides all the magic related to callstack parsing, source code extraction and filtering of the clutter. I also maintain that library, so any contributions to its code are welcome as well.

## See Also

There is also a way to improve your Node errors legibility by using the [Ololog](https://github.com/xpl/ololog) library which is built on the same stack and is maintained by me also:

<a href="https://github.com/xpl/ololog"><img width="1091" alt="Screen Shot 2019-04-06 at 00 56 17" src="https://user-images.githubusercontent.com/1707/55658599-d8b06e00-5806-11e9-935c-32a11d689c92.png"></a>

```javascript
const log = require ('ololog').handleNodeErrors ()
```

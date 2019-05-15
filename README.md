# panic-overlay <sup>BETA</sup> 💥✨[![Build Status](https://travis-ci.org/xpl/panic-overlay.svg?branch=master)](https://travis-ci.org/xpl/panic-overlay) [![NPM](https://img.shields.io/npm/v/panic-overlay.svg)](http://npmjs.com/package/panic-overlay)

A lightweight standalone plain JS alternative to `react-error-overlay` that is not tied to React / Webpack and works with any framework or even without one.

If you miss that thing from `create-react-app` but do not want to use that framework (e.g. you want to use [Parcel](https://parceljs.org/) as a lightweight zero-configuration alternative) — here you go!

## Features

- Displays runtime errors in browsers
- Minimalistic implementation (bare DOM API), [easily hackable](https://github.com/xpl/panic-overlay/blob/master/README.md#hacking)
- Full sourcemap support (shows original code, not transpiled)
- Clickable locations (opens in VS Code), [see the notes here](https://github.com/xpl/panic-overlay#vs-code-notes)
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

All-in-one browser bundle (batteries included), served from a CDN of your choice. Creates a global `panic` object.

- jsDelivr: https://cdn.jsdelivr.net/npm/panic-overlay/build/panic-overlay.browser.js
- unpkg: https://unpkg.com/panic-overlay

```html
<script src="https://unpkg.com/panic-overlay"></script>
```

## Demos

Here's how you can find an example usage of `panic-overlay` in various development environments:

```sh
git clone https://github.com/xpl/panic-overlay.git
cd panic-overlay
npm install
```

| Environment             | Run with                            | Source folder                                             |
| ----------------------- | ----------------------------------- | --------------------------------------------------------- |
| `<script>` tag          | `npm run demo-no-bundler`           | [`demo/no-bundler`](/demo/no-bundler)                     |
| Parcel                  | `npm run demo-parcel-vanilla`       | [`demo/parcel-vanilla`](/demo/parcel-vanilla)             |
| Parcel (React JSX)      | `npm run demo-parcel-react`         | [`demo/parcel-react`](/demo/parcel-react)                 |
| Webpack                 | `npm run demo-webpack-vanilla`      | [`demo/webpack-vanilla`](/demo/webpack-vanilla)           |

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

Currently there is a problem with automatically determining the full file paths (at least, when using Parcel bundler), so you need to provide it manually, otherwise the error locations won't be clickable:

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

## Hacking

The `panic-overlay` is just a GUI for the [**`stacktracey`**](https://github.com/xpl/stacktracey) library that provides all the magic related to callstack parsing, source code extraction and filtering of the clutter. I also maintain that library, so any contributions to its code are welcome as well.

I highly appreciate any help from the community with the following:

- [ ] Testing with various module bundlers / frameworks
- [ ] Implementing parsing of React JSX errors in [**`stacktracey`**](https://github.com/xpl/stacktracey) ([see more here](https://github.com/parcel-bundler/parcel/issues/2765))
- [ ] Determining the full file paths for [clickable locations](https://github.com/xpl/panic-overlay#vs-code-notes)
- [ ] Animations & better layout (probably need to center it for wide screens)

## ...One More Thing™

There is also a way to improve your Node errors (and the overall debug output) legibility by using the **[Ololog](https://github.com/xpl/ololog)** library which is built on the same stack and is maintained by me also. Check it out!

```javascript
const log = require ('ololog').handleNodeErrors () // intercepts process errors
```

<a href="https://github.com/xpl/ololog"><img width="1091" alt="Screen Shot 2019-04-06 at 00 56 17" src="https://user-images.githubusercontent.com/1707/55658599-d8b06e00-5806-11e9-935c-32a11d689c92.png"></a>

Showing locations of log calls:

```javascript
log.bright.green ('Syncing order books...')
```

<img width="511" alt="Screen Shot 2019-04-06 at 01 00 10" src="https://user-images.githubusercontent.com/1707/55658763-73a94800-5807-11e9-994e-c74d946b35e1.png">

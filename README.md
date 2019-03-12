# `npm install panic-overlay`

```javascript
import 'panic-overlay'
```

- Displays runtime errors in browsers
- Full sourcemap support (shows original code, not transpiled)
- Clickable locations (opens in VS Code), [see the notes here](https://github.com/xpl/panic-overlay#vs-code-notes)
- Minimalistic implementation (bare DOM API), easily hackable
- Uncluttered stacktraces (collapses third party library calls)

<img width="1420" alt="Screen Shot 2019-03-11 at 00 11 00" src="https://user-images.githubusercontent.com/1707/54091547-44332700-4392-11e9-81a8-8593c48980b1.png">

## Using Without A Bundler

```diff
-TO BE IMPLEMENTED
```

## VS Code Notes

Currently there is a problem with automatically determining the full file paths, so you need to provide it manually, otherwise the error locations won't be clickable:

```javascript
import panic from 'panic-overlay'

panic.configure ({ projectRoot: '/full/path/to/my/project' })
```

## Hacking

The `panic-overlay` is just a GUI for the [**`stacktracey`**](https://github.com/xpl/stacktracey) library that provides all the magic related to callstack parsing, source code extraction and filtering of the clutter. I also maintain that library, so any contributions to its code are welcome as well.

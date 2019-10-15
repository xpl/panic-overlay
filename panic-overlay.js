import StackTracey from 'stacktracey'
import path from 'get-source/impl/path'

const { assign } = Object
const { min, max } = Math

/*  DOM HELPERS --------------------------------------------------------------------    */

const nanoscript = (classPrefix = '') => function createElement (tagIdClasses, props = {}, children = []) {

    if ((props instanceof Node) || (typeof props === 'string') || Array.isArray (props)) { children = props; props = {} }
    if (children && !Array.isArray (children)) children = [children]

    const [tagId, ...classes] = tagIdClasses.split ('.')
    const [tag, id]           = tagId.split ('#')

    const el = document.createElement (tag || 'div')

    if (id) el.id = id

    for (const c of classes)  el.classList.add (classPrefix + c)
    for (const c of children) if (c) el.appendChild (typeof c === 'string' ? document.createTextNode (c) : c)

    return assign (el, props)
}

const h = nanoscript ('panic-overlay__')

/*  CSS --------------------------------------------------------------------------    */

const style = h ('style', `

.panic-overlay__modal {
    
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background:white;
    z-index: 10000;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    font-size:18px;
    --left-pad: 60px;
}

.panic-overlay__modal,
.panic-overlay__modal * {
    display: block;
    padding: 0;
    margin: 0;
    font-family: Menlo, Monaco, "Courier New", Courier, monospace;
}

.panic-overlay__modal span,
.panic-overlay__modal em,
.panic-overlay__modal strong {
    display: inline;
}

.panic-overlay strong {
    font-weight: bold;
}

.panic-overlay__hidden {
    display: none;
}

.panic-overlay__modal h1 {

    color: black;
    margin: 0;
    padding: 0;
    font-size: 1.77em;
    font-weight: 600;
    opacity: 0.75;
    margin-top:50px;
    margin-bottom:45px;
    position: relative;
    padding-left: var(--left-pad);
}

.panic-overlay__close {
    color: black;
    font-weight: normal;
    text-decoration: none;
    position: absolute;
    top:-0.32em;
    right: 1em;
    font-size: 1.77em;
    opacity: 0.15;
    transition: all 0.25s ease-in-out;
}

.panic-overlay__close:hover {
    transform:scale(1.5);
    opacity: 0.25;
}

.panic-overlay__error {
    margin: 1em 0 3em 0;
    left:0;
}

.panic-overlay__error-title {
    display: flex;
    align-items: stretch;
    padding-right: 50px;
}

.panic-overlay__error-type {
    min-height: 2.8em;
    display: flex !important;
    align-items: center;
    padding:0 1em;
    background: rgb(255, 0, 64);
    color: white;
    margin-right: 2em;
    padding-left: var(--left-pad);
    white-space: nowrap;
}

.panic-overlay__error-counter {
    color: white;
    opacity: 0.3;
    position: absolute;
    left: 0.8em;
}

.panic-overlay__error-message {
    display: flex !important;
    align-items: center;
    font-weight:400;
    line-height: 1em;
}

.panic-overlay__error-stack {
    margin-top: 2em;
    white-space: pre;
    padding-left: var(--left-pad);
}

.panic-overlay__stack-entry {
    cursor: pointer;
    margin-bottom: 2.5em;
}

.panic-overlay__collapsed .panic-overlay__stack-entry-hidden {
    display: none;
}

.panic-overlay__file {
    font-weight: bold;
    margin-top: 2.5em;
    margin-bottom: 1.5em;
    color: rgb(202, 17, 63);
}

.panic-overlay__file strong {
    text-decoration: underline;
}

.panic-overlay__file:before,
.panic-overlay__more:before {
    content: '@ ';
    opacity: 0.5;
    margin-left: -1.25em;
}

.panic-overlay__more:before {
    content: '▷ ';
    opacity: 0.5;
}

.panic-overlay__more {
    opacity: 0.25;
    color: black;
    font-size: 0.835em;
    cursor: pointer;
    text-align: center;
    display: none;
}

.panic-overlay__more em {
    font-style: normal;
    font-weight: normal;
    border-bottom: 1px dashed black;
}

.panic-overlay__collapsed .panic-overlay__more {
    display: block;
}

.panic-overlay__lines {
    color:rgb(187, 165, 165);
    font-size: 0.835em;
}

.panic-overlay__lines:not(.panic-overlay__no-fade) {
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0));
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0));
}

.panic-overlay__line-number { 
    padding-right: 1.5em;
    opacity: 0.5;
}

.panic-overlay__line-hili {
    background: #ffff78;
    color: #5f4545;
}

.panic-overlay__stack-entry:first-child .panic-overlay__line-hili strong {
    text-decoration: underline wavy #ff0040;
}

.panic-overlay__line-hili em {
    font-style: italic;
    color: rgb(255, 0, 64);
    font-size: 0.75em;
    margin-left: 2em;
    opacity: 0.25;
    position: relative;
    top: -0.115em;
    white-space: nowrap;
}

.panic-overlay__line-hili em:before {
    content: '← ';
}

.panic-overlay__no-source {
    font-style: italic;
}

@media only screen and (max-width: 640px) {

    .panic-overlay__modal {
        font-size: 15px;
        --left-pad: 50px;
    }
    
    .panic-overlay__modal h1 {
        margin:40px 0;
    }
}

@media only screen and (max-width: 500px) {
    
    .panic-overlay__modal {
        font-size: 14px;
        --left-pad: 45px;
    }
    
    .panic-overlay__modal h1 {
        margin:30px 0;
    }
}

`)

/*  CONFIGURATION --------------------------------------------------------------------------    */

const defaultConfig = {

    handleErrors: true,
    projectRoot:  undefined,

    stackEntryClicked (entry) {
        if (this.projectRoot) {
            window.location = `vscode://file/${path.concat (this.projectRoot, entry.fileRelative)}:${entry.line}:${entry.column}`
        }
    }
}

const config = defaultConfig

/*  RENDERING --------------------------------------------------------------------------    */

const errors = h ('.errors')

const modal = h ('.modal.hidden.collapsed', [
    h ('h1', ['Oops :(', h ('a.close', { href: '#', onclick () { toggle (false) }}, '×')]),
    errors
])

const shouldHideEntry = (entry, i) => (entry.thirdParty || entry['native'] || entry.hide) && (i !== 0)

function renderStackEntry (entry, i, message) {

    const { sourceFile = { lines: [] }, line, column, fileShort, calleeShort, fileRelative } = entry

    const lineIndex = line - 1
    const maxLines  = sourceFile.lines.length
    const window    = 4

    let start = lineIndex - window,
        end   = lineIndex + window + 2

    if (start < 0)        { end   = min (end - start, maxLines);       start = 0         }
    if (end   > maxLines) { start = max (0, start - (end - maxLines)); end   = maxLines  }

    const lines = sourceFile.lines.slice (start, end)
    const lineNumberWidth = String (start + lines.length).length
    const hiliIndex = (line - start - 1)
    const hiliMsg = (i === 0) ? message : ''
    const onLastLine = hiliIndex === (lines.length - 1)

    const className = '.stack-entry' + (shouldHideEntry (entry, i) ? '.stack-entry-hidden' : '')
    
    return h (className, { onclick () { config.stackEntryClicked (entry) } }, [
                h ('.file', h ('strong', fileShort)),
                h ('.lines' + (onLastLine ? '.no-fade' : ''), lines.length
                    ? lines.map ((text, i) => h ('.line' + ((i === hiliIndex) ? '.line-hili' : ''), [
                        h ('span.line-number', String (start + i + 1).padStart (lineNumberWidth, ' ')),
                        h ('span.line-text', (i === hiliIndex) ? renderHighlightedLine (text, column, hiliMsg) : text)
                    ]))
                    : [h ('.line', [
                        h ('span.line-number', String (line)),
                        h ('span.line-text.no-source', `… somewhere at ${calleeShort ? (calleeShort + '()') : '???'} …`),
                    ])]
                )
            ])
}

function renderHighlightedLine (text, column, msg) {

    const [before, after] = [text.slice (0, column - 1), text.slice (column - 1)]
    return [before, h ('strong', after)/*, msg && h ('em', msg)*/]
}

function panic (err) {

    const stack = (new StackTracey (err)).withSources
    const indexText = stack.clean.pretty

    // Deduplication
    for (const el of errors.childNodes) {
        if (el._indexText === indexText) {
            assign (el.querySelector ('.panic-overlay__error-counter'), {
                innerText: el._counter = (el._counter || 1) + 1,
                style: ''
            })
            return
        }
    }

    const showMore = () => modal.classList.remove ('panic-overlay__collapsed')
    
    const type = (err && (err.type || (err.constructor && err.constructor.name))) || typeof err

    const el = h ('.error', { _indexText: indexText }, [
                    h ('.error-title', [
                        h ('span.error-type', [String (type), h ('span.error-counter', { style: 'display: none;' })]),
                        h ('span.error-message', String (err && err.message)),
                    ]),
                    h ('.error-stack', [
                        ...stack.map ((e, i) => renderStackEntry (e, i, err.message)),
                        h ('.more', h ('em', { onclick: showMore }, 'show more'))
                    ])
                ])

    if (!stack.find (shouldHideEntry)) showMore () // hides "show more" if nothing to show

    errors.insertBefore (el, errors.firstChild)
    if (errors.childElementCount > 10) errors.lastChild.remove () // prevents hang in case of vast number of errors

    toggle (true)

    return panic
}

/*  VISIBILITY ON/OFF --------------------------------------------------------------------------    */

let visible = false

function toggle (yes) {

    if (document.body) {
        if (yes) {
            document.head.appendChild (style)
            document.body.appendChild (modal)
        }
        document.body.classList.toggle ('panic-overlay__visible', yes)
    }

    modal.classList.toggle ('panic-overlay__hidden', !yes)
    
    if (visible && !yes) { // clear on hide
        errors.innerText = '' 
        modal.classList.add ('panic-overlay__collapsed')
    }

    visible = yes
    return panic
}

/*  EVENTS --------------------------------------------------------------------------    */

function onUncaughtError (e) { if (config.handleErrors) panic (e) }

window.addEventListener ('error',              e => onUncaughtError (e.error))
window.addEventListener ('unhandledrejection', e => onUncaughtError (e.reason))

;(function onReady (fn) {

    if (document.body) fn ()
    else document.addEventListener ('DOMContentLoaded', fn)

}) (() => { toggle (visible) })

/*  EXPORT --------------------------------------------------------------------------    */

panic.toggle    = toggle
panic.configure = function configure (cfg) { assign (config, defaultConfig, cfg); return panic }

export default panic

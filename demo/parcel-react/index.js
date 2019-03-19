import panic from '../../panic-overlay'
import React from 'react'
import ReactDOM from 'react-dom'

// TODO: solve automatic project path determination
//
// panic.configure ({ projectRoot: '/Users/mac/panic-overlay/demo/parcel-react' })

function App () {
    wharrghabl ()
    return <h1 style="">Oops!</h1> // TODO: implement JSX errors parsing
}

ReactDOM.render (<App />, document.getElementById ('root'))
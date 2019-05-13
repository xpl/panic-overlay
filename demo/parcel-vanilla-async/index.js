/*

    Run with this demo with "npm run demo-parcel-vanilla-async" (in the repo root directory).
    
*/

import panic from '../../panic-overlay'

function helloWorld () {
    document.body.appendChild (666)
}

Promise.resolve ().then (() => {

    helloWorld ()
})
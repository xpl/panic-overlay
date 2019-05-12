import panic from '../../panic-overlay'

function helloWorld () {
    document.body.appendChild (666)
}

Promise.resolve ().then (() => {

    helloWorld ()
})
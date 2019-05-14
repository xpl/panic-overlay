module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.webpack.js'
    },
    devtool: 'source-map',
    node: {
        fs: 'empty' // prevents blaming on require('fs') in get-source
    }
}
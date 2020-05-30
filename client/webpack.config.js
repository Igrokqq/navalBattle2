const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
    },
    watchOptions: {
        ignored: /node_modules/
    }
};

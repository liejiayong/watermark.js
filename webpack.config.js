const path = require('path');

const config = {
    entry: {
        watermark: './lib/watermark.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'WaterMark',
        libraryTarget: 'umd'
    }
};

module.exports = config;

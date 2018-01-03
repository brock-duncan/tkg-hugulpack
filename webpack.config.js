const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

// clean webpack paths
const cleanPaths = [
    './src/site/static/js',
    './src/site/static/css',
    './dist/js',
    './dist/css'
];

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './src/site/static'),
        publicPath: '/',
        filename: 'js/[hash].js'
    },
      plugins: [
        new cleanWebpackPlugin(cleanPaths),
        new extractTextPlugin('css/[hash].css'),
        new htmlWebpackPlugin({
            template: 'src/site/themes/hugulpack/layouts/_default/baseof_temp.html',
            filename: '../themes/hugulpack/layouts/_default/baseof.html'
        })
      ]
};
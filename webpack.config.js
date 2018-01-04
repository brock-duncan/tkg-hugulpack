const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpackThemePath = path.join(__dirname, 'src/site/themes/hugulpack');


// clean webpack paths
const cleanPaths = [
    webpackThemePath + '/static/js/*',
    webpackThemePath + '/static/css/*'
];

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.join(webpackThemePath, '/static'),
        publicPath: '/'
    },
      plugins: [
        new cleanWebpackPlugin(cleanPaths),
        new htmlWebpackPlugin({
            template: path.join(webpackThemePath, '/layouts/_default/baseof_temp.html'),
            filename: path.join(webpackThemePath, '/layouts/_default/baseof.html')
        })
      ]
};
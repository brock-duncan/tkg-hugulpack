const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const hugoThemePath = path.join(__dirname, 'src/site/themes/hugulpack');


// clean webpack paths
const cleanPaths = [
    hugoThemePath + '/static/js/*',
    hugoThemePath + '/static/css/*'
];

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: path.join(hugoThemePath, '/static'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(cleanPaths),
        new htmlWebpackPlugin({
            template: path.join(hugoThemePath, '/layouts/_default/baseof_temp.html'),
            filename: path.join(hugoThemePath, '/layouts/_default/baseof.html'),
            chunks: 'app'
        })
    ]
};
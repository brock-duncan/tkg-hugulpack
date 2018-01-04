const merge = require('webpack-merge');
const common = require('./webpack.config')
const uglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    output: {
      filename: 'js/[hash].js'
    },
    plugins: [
        new uglifyJSWebpackPlugin(),
        new extractTextPlugin('css/[hash].css')
    ],
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: extractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
          }
        ]
      }
})
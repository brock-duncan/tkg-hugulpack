const merge = require('webpack-merge');
const common = require('./webpack.config')
const uglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new uglifyJSWebpackPlugin()
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
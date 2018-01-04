const merge = require('webpack-merge');
const common = require('./webpack.config')
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: 'js/app.js'
  },
  plugins: [
    new extractTextPlugin('css/styles.css'),
  ],
  devtool: 'inline-source-map',
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
                minimize: false,
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
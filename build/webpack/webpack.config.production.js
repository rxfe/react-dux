/**
 * @file config for production
 */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const { getEntries, outputDist } = require('./common')
/* eslint-disable */
const vendorJson = require(path.join(outputDist(), 'vendor.json'))
/* eslint-enable */
const prodConfig = {
  entry: merge.smart({}, getEntries()),

  output: {
    path: outputDist(),
    publicPath: 'http://localhost:3333/dist/'
  },

  module: {
    rules: [
      // Extract all .css to style.css as is
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Set the ExtractTextPlugin output filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'client', 'index.html'),
      vendor: path.join(`/dist/${vendorJson.name}.js`)
    }),

    // custom plugin for output stats.json
    function () {
      this.plugin('done', (stats) => {
        fs.writeFileSync(`${outputDist()}/assets.json`, JSON.stringify(stats.toJson().assets))
      })
    },
  ],
}

module.exports = merge.smart(baseConfig, prodConfig)

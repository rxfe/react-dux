/**
 * @file dll
 */

 /* 开发阶段缩短 webpack 构建时间 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { outputDist } = require('./common')

const dllConfig = {
  context: process.cwd(),

  entry: {
    /* 可以把通用的库配置到这里, 统一打包成vender_[chunkhash].js */
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      // 'react-redux',
      // 'react-router',
      // 'react-router-dom',
      // 'react-router-redux',
      // 'redux',
      // 'whatwg-fetch',
    ]
  },

  output: {
    path: outputDist(),
    library: 'vendor_[chunkhash]',
    filename: 'vendor_[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
    }),

    new webpack.DllPlugin({
      context: __dirname,                              // 解析包路径的上下文，这个要跟接下来配置的 dll user 一致
      path: path.join(outputDist(), 'vendor.json'), // manifest 文件的输出路径
      name: 'vendor_[chunkhash]'                       // dll 暴露的对象名，要跟 output.library 保持一致
    })
  ],
}

module.exports = merge.smart(baseConfig, dllConfig)

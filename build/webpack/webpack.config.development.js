/**
 * @file config for development
 */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const path = require('path')
// const childProcess = require('child_process')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const { outputDist, getEntries } = require('./common')
// const { host } = require('../../config')
const host = 'localhost'

const port = process.env.PORT || 3333
const publicPath = `http://${host}:${port}/dist/`

module.exports = merge.smart(baseConfig, {
  devtool: '#cheap-module-eval-source-map',

  entry: getEntries(),

  output: {
    publicPath,
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),

    new webpack.DllReferencePlugin({
      context: __dirname, // context 需要跟 DllPlugin 保持一致，这个用来指导 Webpack 匹配 manifest 中库的路径
      manifest: path.resolve(outputDist(), './vendor.json') // manifest 用来引入刚才输出的 manifest 文件
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),

    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

  ],

  devServer: {
    host,
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: outputDist(),
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    // setup() {
    //   childProcess
    //     .spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
    //     .on('close', code => process.exit(code))
    //     .on('error', spawnError => console.error(spawnError))
    // }
  }
})

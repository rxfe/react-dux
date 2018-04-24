/**
 * @file base config
 */
const path = require('path')
const webpack = require('webpack')
const webpackAlias = require('./common').webpackAlias

module.exports = {

  context: path.resolve(process.cwd(), 'client'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('./client'),
          /* 有使用到block组件才打开配置 */
          // path.resolve('./node_modules/@mtfe/block/'),
          // path.resolve('./node_modules/@mtfe/block-utils/')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[hash].[ext]'
          }
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[hash].[ext]'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: '[name].[hash].[ext]'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: '[name].[hash].[ext]'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash].[ext]'
          }
        }
      }
    ]
  },

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[chunkhash].bundle.js'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    alias: webpackAlias,
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(process.cwd(), 'client'),
      'node_modules',
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin()
  ],

  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
}

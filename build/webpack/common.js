/**
 * @file webpack common
 */
const path = require('path')
const merge = require('lodash.merge')

const ENV = {
  LOCAL: 'local', // 本地环境
}

function outputDist() {
  return path.resolve(process.cwd(), 'dist')
}

/* 获取 webpack entry 配置 */
function getEntries() {
  const port = process.env.PORT || 3333
  const NODE_ENV = process.env.NODE_ENV
  const BUILD_PROJECT = process.env.BUILD_PROJECT
  const projectsHash = {
    todo: './pages/Todo/index.js',
    error: './pages/Error/index.js',
  }

  switch (NODE_ENV) {
    case ENV.LOCAL: {
      const devConf = [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/only-dev-server'
      ]
      return Object
        .keys(projectsHash)
        .reduce((acc, key) => {
          const projectEntry = projectsHash[key]
          acc[key] = devConf.concat(projectEntry)
          return acc
        }, {})
    }
    default: {
      if (BUILD_PROJECT) {
        return {
          [BUILD_PROJECT]: projectsHash[BUILD_PROJECT]
        }
      }
      return projectsHash
    }
  }
}

const webpackAlias = {
}

module.exports = merge({}, { outputDist, getEntries, webpackAlias })

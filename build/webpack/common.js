/**
 * @file webpack common
 */
import { path } from 'path'
import merge from 'lodash.merge'

function outputDist() {
  return path.resolve(process.cwd(), 'dist')
}
/* 获取 webpack entry 配置 */
function getEntries() {
  const port = process.env.PORT || 3333
  const NODE_ENV = process.env.NODE_ENV
  const BUILD_PROJECT = process.env.BUILD_PROJECT
  const projectsHash = {
    demo: './page/demo/index.js',
    error: './page/error/index.js',
    notfound: './page/notfound/index.js',
    forbidden: './page/forbidden/index.js'
  }
  if (NODE_ENV === 'local') {
    const result = {}
    Object.keys(projectsHash).forEach((key) => {
      result[key] = [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${host}:${port}/`,
        'webpack/hot/only-dev-server',
        projectsHash[key]
      ]
    })
    return result
  }
  return BUILD_PROJECT ? { [BUILD_PROJECT]: projectsHash[BUILD_PROJECT] } : projectsHash
}

const webpackAlias = {
}

module.exports = merge({}, { outputDist, getEntries, webpackAlias })
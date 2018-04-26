/**
 * @file export store config by env
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config.pro') // eslint-disable-line global-require
} else {
  module.exports = require('./config.dev') // eslint-disable-line global-require
}

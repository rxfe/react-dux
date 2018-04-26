/**
 * reducer entry
 */
import { combineReducers } from 'redux'

import todos from './todos'
import authors from './authors'

export default combineReducers({
  todos,
  authors
})

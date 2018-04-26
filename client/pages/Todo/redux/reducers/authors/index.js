/**
 * @file authors reducer
 */

import createReducer from '../../utils'
import { FETCH_AUTHORS } from '../../actions/authors/actionTypes'

const initialState = {
  list: []
}

export default createReducer({
  [FETCH_AUTHORS]: (state, action) => {
    const { payload } = action
    return {
      list: state.list.concat(payload)
    }
  }
}, initialState)

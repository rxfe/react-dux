/**
 * @file authors reducer
 */

import { createAsyncReducer } from '../../utils'
import { FETCH_AUTHORS } from '../../actions/authors/actionTypes'

const initialState = {
  list: []
}

export default createAsyncReducer({
  [FETCH_AUTHORS]: (state, action) => {
    const { payload } = action
    return {
      list: state.list.concat(payload)
    }
  }
}, initialState)

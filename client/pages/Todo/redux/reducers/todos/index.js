/**
 * @file addTodo reducer
 */

import { createReducer } from '../../utils'
import { ADD_TODO } from '../../actions/todo/actionTypes'

const initialState = []

export default createReducer({
  [ADD_TODO]: (state, action) => {
    const { payload } = action
    return state.concat(payload)
  }
}, initialState)

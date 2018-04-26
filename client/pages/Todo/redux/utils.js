/**
 * @file create reducer
 * @desc 异步 Reducer 函数调用 createReducer
 * @desc 非异步 Reducer 函数调用 createReducer
 */

const paddingReg = /_PADDING$/
const successReg = /_SUCCESS$/
const errorReg = /_ERROR$/

export function createAsyncReducer(handlers, initialState) {
  return (state = initialState, action) => {
    const { type, payload } = action

    // 异步 Reducer
    if (paddingReg.test(type)) {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    if (successReg.test(type)) {
      const rawType = type.replace(successReg, '')
      const handler = handlers[rawType]
      const handlerState = typeof handler === 'function' ? handler(state, action) : state
      return {
        ...handlerState,
        isFetching: false,
        fetchError: null
      }
    }
    if (errorReg.test(type)) {
      return {
        ...state,
        isFetching: false,
        fetchError: payload
      }
    }
    return state
  }
}

export function createReducer(handlers, initialState) {
  // 同步 Reducer
  return (state = initialState, action) => {
    const { type } = action
    const handler = handlers[type]
    const handlerState = typeof handler === 'function' ? handler(state, action) : state
    return handlerState
  }
}

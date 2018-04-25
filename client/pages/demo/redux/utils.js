/**
 * @file create reducer
 * @desc 异步 Reducer 函数调用 createReducer
 * @desc 非异步 Reducer 函数调用 createReducer
 */

const paddingReg = /_PADDING$/
const successReg = /_SUCCESS$/
const errorReg = /_ERROR$/

export default function createReducer(handlers, initialState) {
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
      const handler = handlers[type.replace(successReg, '')]
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
    // 同步 Reducer
    const handler = handlers[type]
    const handlerState = typeof handler === 'function' ? handler(state, action) : state
    return {
      ...handlerState,
      isFetching: false,
      fetchError: null
    }
  }
}

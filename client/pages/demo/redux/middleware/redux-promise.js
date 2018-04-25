/**
 * @file redux-promise
 */

function isPromise(val) {
  return val && typeof val.then === 'function'
}

const STATUSMAP = {
  PADDING: 'PADDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

const createPaddingAction = actionType => ({
  type: [actionType, STATUSMAP.PADDING].join('_'),
  payload: null
})

const createSuccessAction = (actionType, data) => ({
  type: [actionType, STATUSMAP.SUCCESS].join('_'),
  payload: data
})

const createErrorAction = (actionType, error) => ({
  type: [actionType, STATUSMAP.ERROR].join('_'),
  payload: error
})

export default function promsieMiddleware({ dispatch }) {
  return next => (action) => {
    const { payload, type } = action
    const isAsyncAction = isPromise(payload)
    if (isAsyncAction) {
      dispatch(createPaddingAction(type))
    }
    return isAsyncAction ? payload.then(
      result => dispatch(createSuccessAction(type, result)),
      (error) => {
        dispatch(createErrorAction(type, error))
        return Promise.reject(error)
      }
    ) : next(action)
  }
}

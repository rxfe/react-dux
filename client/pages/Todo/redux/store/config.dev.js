/**
 * @file store
 */
import { createStore, applyMiddleware, compose } from 'redux'

import promsieMiddleware from '../middleware/redux-promise'

import rootReducer from '../reducers'

const enhancer = compose(
  applyMiddleware(promsieMiddleware)
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }
  return store
}

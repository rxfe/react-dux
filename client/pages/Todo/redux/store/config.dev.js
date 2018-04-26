/**
 * @file store
 */
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promsieMiddleware from '../middleware/redux-promise'

import rootReducer from '../reducers'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const enhancer = composeEnhancers(
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

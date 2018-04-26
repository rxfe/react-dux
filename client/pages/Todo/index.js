/**
 * @file todo page
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import App from './containers/App'

const store = configureStore()

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

render(<AppContainer />, document.getElementById('app'))

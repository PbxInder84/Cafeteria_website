import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import ThemeProvider from './theme/ThemeProvider'
import GlobalStyles from './theme/GlobalStyles'
import './bootstrap.min.css'
import './index.css'
import * as serviceWorker from './serviceWorker'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

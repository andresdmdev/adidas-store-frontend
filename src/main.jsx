import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { store } from './services/store/store.js'
import { Provider } from 'react-redux'
import { getAllProducts } from './services/slices/productsSlice.js'

store.dispatch(getAllProducts())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

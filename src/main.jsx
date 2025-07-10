
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <ToastContainer position="top-center"
        autoClose={3000} />
      <App />
    </BrowserRouter>
  </Provider >
)

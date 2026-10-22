import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthContextProvider> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </AuthContextProvider> */}
  </StrictMode>,
)

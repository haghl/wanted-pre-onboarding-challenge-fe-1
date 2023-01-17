import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'
import router from './router/router'

// const queryClient = new QueryClient()
const root = document.getElementById('App')

if (!root) throw new Error('Can not find root node.')

ReactDom.createRoot(root).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)

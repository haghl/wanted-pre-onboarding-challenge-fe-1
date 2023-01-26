import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import store from './store/store'
import router from './router/router'

// const queryClient = new QueryClient()
const root = document.getElementById('App')

const queryOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
}

const queryClient = new QueryClient(queryOptions)

if (!root) throw new Error('Can not find root node.')

ReactDom.createRoot(root).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <RouterProvider router={router} />
      {/* </PersistGate> */}
    </QueryClientProvider>
  </Provider>
)

import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// const queryClient = new QueryClient()
const root = document.getElementById('App')

if (!root) throw new Error('Can not find root node.')

ReactDom.createRoot(root).render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
)

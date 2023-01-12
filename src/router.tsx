import { createBrowserRouter } from 'react-router-dom'
import Home from '@/page/Home'
import Login from './page/Login'
import SignUp from './page/SignUp'
import Detail from './page/Detail'
import App from './App'
import { getToDoDetail, getToDoList } from './api'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: getToDoList,
        id: 'home',
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: '/:id',
        element: <Detail />,
        loader: ({ params }) => {
          if (params.id) return getToDoDetail(params.id)
        },
      },
    ],
  },
])

export default router

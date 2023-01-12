import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Home from '@/page/Home'
import Login from '@/page/Login'
import SignUp from '@/page/SignUp'
import Detail from '@/page/Detail'
import { IRoutes } from '@/types/route'

export const route: IRoutes[] = [
  { id: 1, path: '/', title: 'Home', component: <Home /> },
  { id: 2, path: '/login', title: 'Login', component: <Login /> },
  { id: 3, path: '/signup', title: 'SignUp', component: <SignUp /> },
  { id: 4, path: '/:id', title: 'Detail', component: <Detail /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: route.map((routes) => {
      return {
        path: routes.path,
        element: routes.component,
      }
    }),
  },
])

export default router

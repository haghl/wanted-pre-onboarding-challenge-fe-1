import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import isLogin from './utils/isLogin'

const App = () => {
  console.log(isLogin)

  return (
    <div id="wrap">
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default App

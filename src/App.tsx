import { Outlet } from 'react-router-dom'
import isLogin from './utils/isLogin'

const App = () => {
  console.log(isLogin)

  return (
    <div id="wrap">
      <Outlet />
    </div>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import SignUp from '@/page/SignUp'
import Home from '@/page/Home'
import Login from '@/page/Login'
import isLogin from './utils/isLogin'
import Redirect from './utils/Redirect'

const App = () => {
  console.log(isLogin)

  return (
    <div id="wrap">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={!isLogin ? <SignUp /> : <Redirect />} />
        <Route path="/" element={isLogin ? <Home /> : <Redirect />} />
      </Routes>
    </div>
  )
}

export default App

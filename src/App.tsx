import { Route, Routes } from 'react-router-dom'
import SignUp from '@/page/SignUp'
import Home from '@/page/Home'
import Login from '@/page/Login'

const App = () => {
  return (
    <div id="wrap">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App

import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import RefreshHandler from '../RefreshHandler'
function App() {

  const [isAuthenticate, setisAuthenticate] = useState(false);


  const PrivateRoute = ({ element }) => {
    return isAuthenticate ? element : <Navigate to={'/login'} />
  }
  useEffect(() => {
    console.log("<-------------------->", isAuthenticate)
  }, [isAuthenticate])
  return (
    <div>
      <RefreshHandler setisAuthenticate={setisAuthenticate} />
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/home' element={<PrivateRoute element={<Home />} />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

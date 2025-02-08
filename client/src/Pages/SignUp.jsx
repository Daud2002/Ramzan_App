import React, { useEffect, useState } from 'react'
import '../App.css'
import { ToastContainer } from 'react-toastify'
import axios, { Axios } from 'axios'
import { handleError, handleSuccess } from '../utils/utils'

export default function SignUp() {


  const [signUpinfo, setsignUpinfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [data, setData] = useState()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const signupinfor = { ...signUpinfo }
    signupinfor[name] = value;
    setsignUpinfo(signupinfor)
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:8080/auth/signup', signUpinfo);
    if (res.data.success) {
      handleSuccess(res.data.message);
      setData(res.data)
    }
    else{
      handleError(res.data.message)
    }
      
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className='main-div'>
      <div className='form-container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className='main-form'>
          <div>
            <input type="text"
              name='name'
              autoFocus
              placeholder='Enter your name'
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input type="email"
              name='email'
              autoFocus
              placeholder='Enter your email'
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input type="password"
              name='password'
              autoFocus
              placeholder='Enter your password'
              onChange={handleInputChange}
            />
          </div>
          <button>SignUp</button>
        </form>
      </div>
    </div>
  )
}

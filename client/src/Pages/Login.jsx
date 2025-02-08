import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { handleError, handleSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [logininfo, setLogininfo] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const copyLogininfo = { ...logininfo }
    copyLogininfo[name] = value
    setLogininfo(copyLogininfo)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;

    if (!email || !password) {
      return handleError('All fields are require')
    }
    else {
      const res = await axios.post("http://localhost:8080/auth/login", logininfo);
      const { jwtToken, name, error } = res.data;
      if (res.data.success) {
        handleSuccess(res.data.message)
        setData(res.data)
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name)
        navigate('/home')
      }
      else {
        handleError(res.data.message)
      }
    }
  };

  return (
    <div className="main-div">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="main-form">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={logininfo.email}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={logininfo.password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

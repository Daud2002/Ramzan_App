import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/utils';
import axios from 'axios';

export default function Home() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    try {
      const payload = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const res = await axios.get('http://localhost:8080/products', payload);
      setData(res.data)
      console.log(res);

    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  console.log("------------------------------", data);
  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logout Successfully');
    navigate('/login');
  }


  return (
    <div className='main-home'>
      Home
      {
        data.map((item, i) => (
          <ul key={i}>
            <li>{item.name} : {item.value}</li>
          </ul>
        ))
      }

      <button className='home_btn' onClick={handlelogout}>Logout</button>
    </div>
  )
}

import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import callAPI from '../services/callAPI';

const login_url = "http://localhost:5000/api/v1/user/login"
const LOGIN = () => {
    const [username,setusername] =useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();
    const submit_handler = async (e)=>{
        e.preventDefault();
        let user = {
            username : username,
            password : password
        }
        const response = await callAPI(login_url,"POST",user,"LOGIN");
        // console.log(response)
        localStorage.setItem("Token",response.data.token);
        localStorage.setItem("RefreshToken",response.data.refreshtoken)
        navigate('/home')
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
    <h2 className="text-2xl font-semibold mb-4">Login</h2>
    <form className="w-96 bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Username"
          value={username}
          onChange={(e)=>{
            setusername(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value);
            console.log(password)
          }}
        />
      </div>
      <button onClick={submit_handler} className="w-full py-2 bg-blue-500 text-white rounded-md">
        Login
      </button>
    </form>
    <Link to="/register" className="mt-4 text-blue-500 hover:underline">Go to Register</Link>
  </div>
  )
}

export default LOGIN

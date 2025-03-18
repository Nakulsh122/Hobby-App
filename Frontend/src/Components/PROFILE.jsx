import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import callAPI from "../services/callAPI";
const user_url_base = "http://localhost:5000/api/v1/user"


// profile function
const PROFILE = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handle_data = async()=>{
  const {id} =  jwtDecode(localStorage.getItem("Token"))
  // console.log(id)
  const data = await callAPI(`${user_url_base}/${id}`,"GET",undefined,undefined,localStorage.getItem("Token"))
  // console.log(data);
  setUser(data);
  // console.log(data)
  }
  useEffect(()=>{
    handle_data()
  },[])
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {user ? (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md ">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            onClick={() => {
              localStorage.removeItem("token"); // Logout
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default PROFILE;

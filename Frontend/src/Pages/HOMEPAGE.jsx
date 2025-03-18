import React, { useEffect, useState } from 'react'
import NAVBAR from '../Components/Navbar'
import callAPI from '../services/callAPI';
import PROFILE from '../Components/PROFILE';
import STREAKHOBBYCARD from '../Components/StreakHobbyCard';
import PROGRESSHOBBYCARD from '../Components/ProgressHobbyCard'
import { jwtDecode } from 'jwt-decode';
import { PlusCircleIcon } from 'lucide-react';
import HOBBYMODAL from '../Components/modalAddHobby';
const hobbies_url_base = "http://localhost:5000/api/v1/hobby"

//main homepage function
const HOMEPAGE = () => {
  const [hobbies,setHobbies] = useState([]);
  const {id} = jwtDecode(localStorage.getItem('Token'));
  const [hobbyModal , setHobbyModal] = useState(false);
  
  const getHobbiesData = async()=>{
    const {id} = jwtDecode(localStorage.getItem('Token'));
    const data = await callAPI(`${hobbies_url_base}/${id}`,"GET",undefined,undefined,localStorage.getItem("Token"));
    setHobbies(data);
  }
  const closeModal = ()=>{
    setHobbyModal(false)
  }
  const addHobby = async(hobbydata)=>{
    console.log(hobbydata)
    const {id} = jwtDecode(localStorage.getItem("Token"))
    const data = {...hobbydata,userId : id}
    const response = await callAPI(`${hobbies_url_base}`,"POST",data,undefined,localStorage.getItem("Token"))
    getHobbiesData();
  }
  useEffect(()=>{
    getHobbiesData();
  },[])
  return (
    <div>
      {hobbyModal && <HOBBYMODAL isOpen={hobbyModal} onClose={closeModal} onSave={addHobby}/>}
      <NAVBAR/>
      <div className="flex h-screen bg-gray-100 p-4">
      {/* Profile Section (30%) */}
      <div className="w-1/4 min-w-[400px] bg-white rounded-lg shadow-md p-4">
        <PROFILE/>
      </div>

      {/* Hobbies Grid (70%) */}
      <div className="w-3/4 p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Hobbies</h2>
        <button className='p-2 m-auto bg-blue-500 rounded-md justify-center items-center text-white flex hover:opacity-90 active:opacity-95'onClick={()=> setHobbyModal(true)}><PlusCircleIcon className='size-5 mx-1'/><span>Add Hobbies</span></button>
        <div className="grid grid-cols-3 gap-4">
          { if(hobbies.len > 0){

            hobbies.map(hobby =>
              hobby.type === "progress" ? <PROGRESSHOBBYCARD key={hobby._id} data={hobby}/> : <STREAKHOBBYCARD key={hobby._id} data={hobby}/>
            )}
          } 
        </div>
      </div>
    </div>
    </div>
  )
}

export default HOMEPAGE

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
const user_url_base = "http://localhost:5000/api/v1/user"

//main homepage function
const HOMEPAGE = () => {
  const [hobbies, setHobbies] = useState([]);
  const [hobbyModal, setHobbyModal] = useState(false);
  const [userpoints, setpoints] = useState(0)

  const getHobbiesData = async () => {
    const { id } = jwtDecode(localStorage.getItem('Token'));
    const data = await callAPI(`${hobbies_url_base}/${id}`, "GET", undefined, undefined, localStorage.getItem("Token"));
    // console.log(data)
    if (data.length > 0) {
      setHobbies(data);
    }

  }
  const closeModal = () => {
    setHobbyModal(false)
  }
  const addHobby = async (hobbydata) => {
    const { id } = jwtDecode(localStorage.getItem("Token"));
    const data = { ...hobbydata, userId: id };

    try {
      // Add new hobby
      await callAPI(`${hobbies_url_base}`, "POST", data, undefined, localStorage.getItem("Token"));

      // Increase XP by 50
      const newXP = userpoints + 50;
      handlepointsUpdate(newXP);

      // Update total hobbies count
      updateTotalHobbies();

      // Refresh the hobby list dynamically
      getHobbiesData();
    } catch (error) {
      console.error("Error adding hobby:", error);
    }
  };

  const updateTotalHobbies = async () => {
    const { id } = jwtDecode(localStorage.getItem("Token"));

    try {
      // Fetch current user data
      const userData = await callAPI(`${user_url_base}/${id}`, "GET", undefined, undefined, localStorage.getItem("Token"));

      // Increment total hobbies count
      const updatedHobbiesCount = (userData.total_hobbies || 0) + 1;

      // Update the backend
      await callAPI(`${user_url_base}/${id}`, "PUT", { total_hobbies: updatedHobbiesCount }, undefined, localStorage.getItem("Token"));

      // Refresh profile data dynamically
      getHobbiesData();
    } catch (error) {
      console.error("Error updating total hobbies count:", error);
    }
  };


  useEffect(() => {
    getHobbiesData();
  }, [])

  const deleteHobby = async (id) => {
    console.log("deleting", id);
    try {
      const response = await callAPI(`${hobbies_url_base}/${id}`, "DELETE", undefined, undefined, localStorage.getItem('Token'));
      decreaseTotalHobbies();
      // console.log(response);
      getHobbiesData();
    } catch (error) {
      console.log(error.message);
    }
  }
  const decreaseTotalHobbies = async () => {
    const { id } = jwtDecode(localStorage.getItem("Token"));

    try {
      // Fetch current user data
      const userData = await callAPI(`${user_url_base}/${id}`, "GET", undefined, undefined, localStorage.getItem("Token"));

      // Decrement total hobbies count, ensuring it doesn't go below 0
      const updatedHobbiesCount = Math.max((userData.total_hobbies || 1) - 1, 0);

      // Update the backend
      await callAPI(`${user_url_base}/${id}`, "PUT", { total_hobbies: updatedHobbiesCount }, undefined, localStorage.getItem("Token"));

      // Refresh profile data dynamically
      getHobbiesData();
    } catch (error) {
      console.error("Error decreasing total hobbies count:", error);
    }
  };
  const handlepointsUpdate = async (points) => {
    const { id } = jwtDecode(localStorage.getItem("Token"));
    try {
      await callAPI(`${user_url_base}/${id}`, "PUT", {
        total_xp: points
      }, undefined, localStorage.getItem("Token"));
      getHobbiesData();
      window.location.reload()
    } catch (error) {
      console.error("Error updating XP:", error);
    }
  };

  const handleUpdate = async (hobbydata) => {
    const response = await callAPI(`${hobbies_url_base}/${hobbydata._id}`, "PUT", hobbydata, undefined, localStorage.getItem("Token"))
    console.log(response.data.message)
    getHobbiesData();
  }
  const handlepoints = (points) => {
    setpoints(points);
  }
  return (
    <div>
      {hobbyModal && <HOBBYMODAL isOpen={hobbyModal} onClose={closeModal} onSave={addHobby} />}
      <NAVBAR />
      <div className="flex h-screen bg-gray-100 p-4">
        {/* Profile Section (30%) */}
        <div className="w-1/4 min-w-[400px] bg-white rounded-lg shadow-md p-4">
          <PROFILE sendUserScore={handlepoints} xp={userpoints} />
        </div>

        {/* Hobbies Grid (70%) */}
        <div className="w-3/4 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Hobbies</h2>
          <button className='p-2 m-auto bg-blue-500 rounded-md justify-center items-center text-white flex hover:opacity-90 active:opacity-95' onClick={() => setHobbyModal(true)}><PlusCircleIcon className='size-5 mx-1' /><span>Add Hobbies</span></button>
          <div className="mt-10 flex flex-wrap justify-center h-[70%] gap-4 overflow-y-scroll">
            {hobbies.map(hobby => (
              hobby.type === "progress" ? <PROGRESSHOBBYCARD key={hobby._id} data={hobby} sendData={handleUpdate} deleteHobby={deleteHobby} points={userpoints} sendBackPoints={handlepointsUpdate} /> : <STREAKHOBBYCARD key={hobby._id} data={hobby} sendData={handleUpdate} deleteHobby={deleteHobby} points={userpoints} sendBackPoints={handlepointsUpdate} />
            )) || <p>No Hobbies present</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HOMEPAGE

import React from 'react'
import NAVBAR from '../Components/Navbar'
import callAPI from '../services/callAPI';
import PROFILE from '../Components/PROFILE';

const HOMEPAGE = () => {
  return (
    <div>
      <NAVBAR/>
      <div className="flex h-screen bg-gray-100 p-4">
      {/* Profile Section (30%) */}
      <div className="w-1/4 bg-white rounded-lg shadow-md p-4">
        <PROFILE/>
      </div>

      {/* Hobbies Grid (70%) */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Hobbies</h2>
        <div className="grid grid-cols-3 gap-4">
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default HOMEPAGE

import React from "react";

const  PROFILE =()=> {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com", // Replace with user's actual image URL
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <img
          src=""
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300"
        />
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}

export default PROFILE
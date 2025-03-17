import React from "react";

const  PROFILE =()=> {

  return (
    <div className="w-72 flex-col h-full bg-slate-100 justify-center items-center text-center rounded-md">
      <h1>Your Name</h1>
      <img src="" alt="your profile img" className="rounded-full border-4 border-blue-400 h-52 w-52 object-cover m-auto "/>
      <p>Name :</p>
      <p>@username</p>
      <p>Email</p>
      {/* the score card */}
      <div className="">
        <div>
        <p>Level :</p>
        <p>Total XP points :</p>
        </div>
        <div>

        <p>Completed Tasks :</p>
        <p>Ongoing Task :</p>
        </div>
      </div>
    </div>
  );
}

export default PROFILE
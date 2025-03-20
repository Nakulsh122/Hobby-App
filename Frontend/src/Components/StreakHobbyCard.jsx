import React, { useState } from 'react'
import { Trash } from 'lucide-react';
import { useEffect } from 'react';
import MODAL from '../atoms/modal';
import callAPI from '../services/callAPI';

const STREAKHOBBYCARD = ({ data, sendData, deleteHobby,points,sendBackPoints }) => {
  const [modal, setmodal] = useState(false);
  const [hobbydata, setHobbydata] = useState({});
  const xp=points
  const datediff = (curr, last) => {
    if (curr.split("T")[0] === last.split("T")[0]) {
      return false
    }
    return true;
  }
  const addstreak = () => {
    var hobby = { ...hobbydata };
    const todayDate = new Date().toISOString();
    const lastupdatedDate = new Date(hobby.lastupdated).toISOString();
    
    if (datediff(todayDate, lastupdatedDate)) {
        hobby.streakCount++;
        hobby.lastupdated = new Date().toISOString();
    } else {
        console.log("Already updated for today");
        return;
    }
    
    let newXP = points + 10;
    setHobbydata(hobby);
    sendData(hobby);
    sendBackPoints(newXP);
};

  const confirm = () => {
    setmodal(false);
    deleteHobby(hobbydata._id);
  }
  useEffect(() => {
    setHobbydata(data);
  }, [data])

  return (
    <>
      {modal && <MODAL message="Are you sure you want to delete the Hobby" onClose={() => setmodal(false)} onConfirm={confirm} isOpen={modal} />}
      <div className='flex-col space-y-5 font-mono bg-slate-100 w-64 h-64 rounded-md p-3 shadow-2xl'>
        <div >
          <h1 className='font-mono font-bold text-lg'>{hobbydata.hobbyName}</h1>
          <p>Date Started : {hobbydata.created_at}</p>
          <p>Longest Streak : {hobbydata.streakCount}</p>
          <p>Current Streak : {hobbydata.streakCount}</p>
        </div>
        <div className='flex-col space-y-2'>

          <button className='w-[100%] bg-blue-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95' onClick={addstreak}>Add Streak</button>
          <button className='w-[100%] bg-red-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95 flex items-center justify-center' onClick={() => setmodal(true)}><Trash className='size-5 ' /><span>Delete</span></button>
        </div>
      </div>
    </>
  );
}

export default STREAKHOBBYCARD

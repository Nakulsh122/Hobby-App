import React, { useState } from 'react'
import { Trash } from 'lucide-react';
import { useEffect } from 'react';

const STREAKHOBBYCARD = ({data,sendData}) => {
  const [modal ,setmodal] = useState(false);
  const [hobbydata,setHobbydata] = useState({});
  const datediff =(curr,last)=>{
    if(curr.split("T")[0] === last.split("T")[0]){
      return false
    }
    return true;
  }
  const addstreak = () =>{
    // console.log(hobbydata)
    var hobby = {...hobbydata};
    // console.log(hobby);
    // console.log("steak",hobby.streakCount);
    const currtime = new Date();
    const todayDate = new Date().toISOString();
    const lastupdatedtime = new Date(hobby.lastupdated);
    const lastupdatedDate = new Date(lastupdatedtime).toISOString();
    let interval = currtime - lastupdatedtime;;
    // console.log("interval",interval);
    if(interval > 86400000){
      hobby.streakCount = 1;
      hobby.lastupdated = new Date().toISOString();
      console.log("reset")
    }else if(datediff(todayDate,lastupdatedDate)){
      hobby.streakCount++;
      hobby.lastupdated = new Date().toISOString()
      console.log("Increament");  
    }else{
      console.log("Already updated for today")
    }
    setHobbydata(hobby);
    sendData(hobby);
  }
  useEffect(()=>{
    setHobbydata(data);
  },[data])

  return (
    <> 
    <div className='flex-col space-y-5 font-mono bg-slate-100 w-64  rounded-md p-3'>
      <div >
      <h1 className='font-mono font-bold text-lg'>{hobbydata.hobbyName}</h1>
      <p>Date Started : {hobbydata.created_at}</p>
      <p>Longest Streak : {hobbydata.streakCount}</p>
      <p>Current Streak : {hobbydata.streakCount}</p>
      </div>
      <div className='flex-col space-y-2'>

<button className='w-[100%] bg-blue-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95' onClick={addstreak}>Add Streak</button>  
<button className='w-[100%] bg-red-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95 flex items-center justify-center'><Trash className='size-5 '/><span>Delete</span></button>  
  </div> 
    </div>
    </>
  );
}

export default STREAKHOBBYCARD

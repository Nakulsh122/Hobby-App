import React, { useEffect, useState } from 'react'
import 'lucide-react'
import { Trash } from 'lucide-react'
import MODAL from '../atoms/modal';
import PROGRESSMODAL from '../atoms/progressModal';

const PROGRESSHOBBYCARD = ({data,sendData,deleteHobby,points,sendBackPoints}) => {
  const [progressModal,setprogressModal] = useState(false);
  const [modal,setModal] = useState(false);
  const [hobbyData,setData] = useState({});
  const xp = points 
  const handleData = (updatedData) => {
    setData(updatedData);
    let newXP = points + 10;  // Use updated XP
    sendData(updatedData); 
    sendBackPoints(newXP);  // This should trigger an update
};

  
  const confirm = ()=>{
    setModal(false);
    deleteHobby(hobbyData._id);
  }
  useEffect(()=>{
    setData(data);
  },[data]);
  // console.log(hobbyData);
  return (
    <>
    {modal && <MODAL message="Are you sure you want to Delete the Hobby" onClose={()=>setModal(false)} onConfirm={confirm} isOpen={modal}/>}
    {progressModal && <PROGRESSMODAL data={hobbyData} onClose={()=>setprogressModal(false)} onSave={handleData}/>}
    <div className='flex-col items-end space-y-3 font-mono bg-slate-100 h-[300px] w-64 rounded-md p-3 shadow-2xl'>
      <div >
      <h1 className='font-mono font-bold text-lg'>Name of Hobby</h1>
      <p className='font-mono text-gray-400 text-sm'>{hobbyData?.progress?.goal}</p>
      <p>Date Started : {hobbyData.created_at}</p>
      <p>Current Progress : {hobbyData?.progress?.currentProgress} {hobbyData?.progress?.unit}</p>
      <p>Goal : {hobbyData?.progress?.totalGoal} {hobbyData?.progress?.unit}</p>
      </div>
      <div className='flex-col space-y-2'>
    <button className='w-[100%] bg-blue-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95' onClick={()=>setprogressModal(true)}>Add Progres</button>  
    <button className='w-[100%] bg-red-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95 flex items-center justify-center' onClick={()=>setModal(true)}><Trash className='size-5 '/><span>Delete</span></button>  
      </div>
    </div>
    </>

  )
}

export default PROGRESSHOBBYCARD

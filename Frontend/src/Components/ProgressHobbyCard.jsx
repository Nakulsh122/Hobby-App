import React from 'react'

const PROGRESSHOBBYCARD = () => {
  return (
    <div className='flex-col space-y-5 font-mono bg-slate-100 w-64  rounded-md p-3'>
      <div >
      <h1 className='font-mono font-bold text-lg'>Name of Hobby</h1>
      <p>Date Started : </p>
      <p>Current Progress : </p>
      <p>Goal : </p>
      </div>
    <button className='w-[100%] bg-blue-600 text-white font-bold py-2 rounded-md hover:opacity-90 active:opacity-95'>Add Progres</button>  
    </div>

  )
}

export default PROGRESSHOBBYCARD

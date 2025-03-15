import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NAVBAR from './Components/Navbar'
import PROFILE from './Pages/Profile'
import HOBBYCARD from './Components/HobbyCard'


const App = () => {
  return (
    <div className='min-h-screen width-screen transition-color bg-[#000015]'>
      <NAVBAR />
      <PROFILE />
      <HOBBYCARD
        hobby={{
          _id: "123",
          hobbyName: "Reading",
          type: "progress",
          progress: {
            unit: "pages",
            totalGoal: 500,
            currentProgress: 120,
            goal: "Finish 500 pages of a book",
          },
        }}
        onAddStreak={(hobbyId) => console.log("Adding streak for hobby:", hobbyId)}
      />
    </div>
  )
}

export default App

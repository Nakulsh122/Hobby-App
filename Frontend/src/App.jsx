import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NAVBAR from './Components/Navbar'
import PROFILE from './Pages/Profile'
import STREAKHOBBYCARD from './Components/StreakHobbyCard'
import PROGRESSHOBBYCARD from './Components/ProgressHobbyCard'


const App = () => {
  return (
    <div className='min-h-screen width-screen transition-color bg-[#000015]'>
      <NAVBAR />
      {/* <PROFILE /> */}
      <STREAKHOBBYCARD />
      <PROGRESSHOBBYCARD/>
      <PROFILE/>
    </div>
  )
}

export default App

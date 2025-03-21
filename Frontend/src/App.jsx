import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LOGIN from './Pages/Login'
import REG from './Pages/Register'
import HOMEPAGE from './Pages/HOMEPAGE'
// localStorage.clear() 
const App = () => {
  return (
    <div className='min-h-screen w-full transition-color bg-[#000015]'>
      <Routes>
        <Route path='/' element={<LOGIN/>}/>
        <Route path='/register' element={<REG/>}/>
        <Route path='/home' element={<HOMEPAGE/>}/>
      </Routes>
    </div>
  )
}

export default App

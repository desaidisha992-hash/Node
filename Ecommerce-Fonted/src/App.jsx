import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import JoinUs from './Pages/JoinUs'
import Profile from './Pages/Profile'


const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/joinus' element={<JoinUs/>}/>
    <Route path='/profile' element={<Profile/>}/>
    </Routes>
   
   
  )
}

export default App
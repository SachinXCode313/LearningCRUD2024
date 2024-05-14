import {useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Users from './components/Users.jsx'
import AddUser from './components/AddUser.jsx'





function App() {

  return (
    <>

        <Navbar/>
        <hr />


      <Routes>
        <Route path='/' element = {<Users></Users>}></Route>
        <Route path='/create' element= {<AddUser></AddUser>}></Route>
      </Routes>

    
      
      </>
  )
}

export default App

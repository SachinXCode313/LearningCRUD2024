import {useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
// import CreateUser from './components/user_in_mongo/CreateUser.jsx'
import CreateUser from './components/user_in_sheet/CreateUser.jsx'




function App() {

  return (
    <>
      {/* <Routes>
        <Route path='/' element= {<CreateUser></CreateUser>}></Route>
        <Route path='/' element= {<User></User>}></Route>
        <Route path='/' element= {<CreateUser></CreateUser>}></Route>
      </Routes> */}

      <CreateUser />
    
      
      </>
  )
}

export default App

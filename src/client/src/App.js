import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavbarView from './views/NavbarView'
import Login from './views/LoginView'
import Signup from './views/SignupView' 
import UserInfo from './views/UserInfo'

import Map from './Map'
function App() {
  return (
    // <div className="bg-black text-white">App
    //    <h1 className="text-3xl font-bold underline text-blue-500">
    //   Hello world!
    // </h1>
    // </div>
<Router>
    <NavbarView/>
    <Routes>
      <Route exact path="/" element={<Map/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/UserInfo" element={<UserInfo/>}/>

    </Routes>

</Router>

    
  )
}

export default App
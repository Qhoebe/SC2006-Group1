import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavbarView from './views/NavbarView';
import Login from './views/LoginView';
import Signup from './views/SignupView';
import UserInfo from './views/UserInfo';

import Map from './Map';

function App() {
  return (
    <Router>
      <NavbarView/>
        <Routes>
          <Route path="/" element={<Map/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/UserInfo" element={<UserInfo/>}/>
        </Routes>
    </Router> 
  );
}

export default App;

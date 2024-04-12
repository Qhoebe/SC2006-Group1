import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavbarView from './views/NavbarView';
import Login from './views/LoginView';
import Signup from './views/SignupView';
import UserInfo from './views/UserInfo';
import { ScriptLoadProvider } from './context/ScriptLoadProvided'; 

import Map from './Map';

function App() {
  return (
    <ScriptLoadProvider scriptUrl={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY_2}&libraries=places`}>
      <Router>
        <NavbarView/>
          <Routes>
            <Route path="/" element={<Map/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/UserInfo" element={<UserInfo/>}/>
          </Routes>
      </Router>
    </ScriptLoadProvider>
  );
}

export default App;

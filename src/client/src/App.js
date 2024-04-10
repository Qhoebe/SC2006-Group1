import {React, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScriptLoadContext from './context/ScriptLoadContext';

import NavbarView from './views/NavbarView'
import Login from './views/LoginView'
import Signup from './views/SignupView' 
import UserInfo from './views/UserInfo'
import useLoadScript from './utils/useLoadScript';

import Map from './Map'
function App() {

  const [isScriptLoaded, setScriptLoaded] = useState(false);
  useLoadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY_2}&libraries=places`, setScriptLoaded);
  return (
    
    <Router>
        <NavbarView/>
        <ScriptLoadContext.Provider value={isScriptLoaded}>
          <Routes>
            <Route path="/" element={<Map/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/UserInfo" element={<UserInfo/>}/>
          </Routes>
        </ScriptLoadContext.Provider>

    </Router> 
  )
}

export default App
import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faCircleUser,faRectangleList,
  faMapLocationDot,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import Navbar, { NavbarItem } from '../components/Navbar'

function NavbarView() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = window.sessionStorage.getItem("username");
    setCurrentUser(user);
  },[])
  const clearUser = () =>{window.sessionStorage.clear(); setCurrentUser(null);}
    
  
  return (
   <Navbar>
    <NavbarItem icon={<FontAwesomeIcon icon={faMapLocationDot} color='black'/>} text="Home" link="/" />
    
    {currentUser==null&&<NavbarItem icon={<FontAwesomeIcon icon={faCircleUser} color='black'/>} text="Login" link="/login"/>}
   
    {currentUser && <NavbarItem icon={<FontAwesomeIcon icon={faRectangleList} color='black'/>} text="Account" link = "/UserInfo"/>}
    <NavbarItem icon={<></>} text={window.sessionStorage.getItem("username")?`Welcome ${window.sessionStorage.getItem("username")}`:"Guest"}/>
    
    {currentUser&&
    <button onClick={clearUser}>
    <NavbarItem icon={<FontAwesomeIcon icon={  faArrowRightFromBracket} color='black'/>} text="Logout" link="/login" />
    </button>
}
   </Navbar>
  )

}


export default NavbarView
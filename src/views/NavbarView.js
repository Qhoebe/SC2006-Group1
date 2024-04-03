import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faCircleUser,
  faMapLocationDot
} from '@fortawesome/free-solid-svg-icons'
import Navbar, { NavbarItem } from '../components/Navbar'

function NavbarView() {
  return (
   <Navbar>
    <NavbarItem icon={<FontAwesomeIcon icon={faMapLocationDot} color='black'/>} text="Home" link="/" />
    <NavbarItem icon={<FontAwesomeIcon icon={faCircleUser} color='black'/>} text="Login" link="/login"/>
    <NavbarItem icon={<FontAwesomeIcon icon={faBars} color='black'/>} text="Placeholder"/>
    <NavbarItem icon={<FontAwesomeIcon icon={faBars} color='black'/>} text="Placeholder"/>
    
   </Navbar>
  )
}

export default NavbarView
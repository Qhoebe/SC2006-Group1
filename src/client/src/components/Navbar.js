import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faBars,faArrowLeft,faAnglesLeft,faAnglesRight,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
//<FontAwesomeIcon icon={faCar} color='red'/>

function Navbar({children}) {
  return (
    <nav className=" items-center flex-row flex justify-center bg-white border-r shadow-sm">


    <div className="flex flex-row">
     {children}

    </div>


      
    </nav>
  )
}

export function NavbarItem({icon, text, link}) {
return(
<div className="p-4 py-2 flex  cursor-pointer items-center rounded-lg
 hover:bg-gray-200 text-2xl" >
   <Link to={link}>
         {icon}
          <span className="ml-2">{text}</span>
   </Link>

          </div>

);

}

export default Navbar
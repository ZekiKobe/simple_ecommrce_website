import React, {useState} from 'react'
import './mobileNav.css'
import { Link } from 'react-router-dom';
import logo_icon from '../../Assets/logo.png'


function MobileNav({isOpen,toggleMenu}) {

    const [menu,setMenu] = useState("Home");
    return (
        <>
         <div className={`mobile-menu ${isOpen ? "active":""}`}
         onClick={toggleMenu}>
            <div className="mobile-menu-container">
            <p style={{color:'white'}}>Kobe Furniture</p>
                <img src={logo_icon} alt="" className="logo" />
                <ul className='navbar-menu'>
                <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none', color:'white'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>} </li>

                    <li onClick={()=>{setMenu("wood")}}><Link style={{textDecoration:'none',color:'white'}} to='/woods'>Wood</Link>{menu==="wood"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("metal")}}><Link style={{textDecoration:'none',color:'white'}} to='/metals'>Metal</Link>{menu==="metal"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("sofa")}}><Link style={{textDecoration:'none',color:'white'}} to='/sofas'>Sofa</Link>{menu==="sofa"?<hr/>:<></>}</li>

                    <button className="getStarted-btn">Get Started</button>
                    
                </ul>
            </div>
            </div>

            </>
    )
}

export default MobileNav

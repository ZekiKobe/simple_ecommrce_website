import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'


import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { HomeContext } from '../../Context/homeContext';
import dropDown_icon from '../Assets/dropdownIcon.png'

function Navbar() {
    const [menu,setMenu] = useState("home");
    const {getTotalCartItems} = useContext(HomeContext)
    const menuRef = useRef();
    const dropdowm_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>ECOMMERCE</p>
                <img className='nav-dropdown' src={dropDown_icon} onClick={dropdowm_toggle} alt="" />
                <ul ref={menuRef} className="nav-menu">
                    <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>} </li>
                    <li onClick={()=>{setMenu("woods")}}><Link style={{textDecoration:'none'}} to='/woods'>Wood</Link>{menu==="mens"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("metals")}}><Link style={{textDecoration:'none'}} to='/metals'>Metal</Link>{menu==="womens"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("sofas")}}><Link style={{textDecoration:'none'}} to='/sofas'>Sofa</Link>{menu==="kids"?<hr/>:<></>}</li>
                </ul>
                <div className="nav-login-cart">
                    {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
                    <Link to='/login'><button>Login</button></Link>}
                    <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar

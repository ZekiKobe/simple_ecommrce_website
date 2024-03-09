import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'


import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { HomeContext } from '../../Context/homeContext';
import dropDown_icon from '../Assets/dropdownIcon.png'

function Navbar() {
    const [menu,setMenu] = useState("Home");
    const {getTotalCartItems} = useContext(HomeContext)
    const menuRef = useRef();
    const dropdowm_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');
    }
    const loginCheck = ()=>{
        if(!localStorage.getItem('auth-token')){
            window.location.replace('/login');
        }else{
            window.location.replace('/cart');
        }
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p> Kobe Furniture</p>
                <img className='nav-dropdown' src={dropDown_icon} onClick={dropdowm_toggle} alt="" />
                <ul ref={menuRef} className="nav-menu">
                    <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none', color:'white'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>} </li>
                    <li onClick={()=>{setMenu("wood")}}><Link style={{textDecoration:'none',color:'white'}} to='/woods'>Wood</Link>{menu==="wood"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("metal")}}><Link style={{textDecoration:'none',color:'white'}} to='/metals'>Metal</Link>{menu==="metal"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("sofa")}}><Link style={{textDecoration:'none',color:'white'}} to='/sofas'>Sofa</Link>{menu==="sofa"?<hr/>:<></>}</li>
                </ul>
                <div className="nav-login-cart">
                    {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
                    <Link to='/login'><button>Login</button></Link>}
                    <Link to='/cart'><img src={cart_icon} onClick={loginCheck} alt="" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar

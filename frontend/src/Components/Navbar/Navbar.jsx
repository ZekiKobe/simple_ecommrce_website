import React, { useContext, useState } from 'react'
import './Navbar.css'
import menu_icon from '../Assets/menu.png'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { HomeContext } from '../../Context/homeContext';
import MobileNav from './mobileNav/mobileNav';

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () =>{
        setOpenMenu(!openMenu);
    };
    const [menu,setMenu] = useState("Home");
    const {getTotalCartItems} = useContext(HomeContext)

    const loginCheck = ()=>{
        if(!localStorage.getItem('auth-token')){
            window.location.replace('/login');
        }else{
            window.location.replace('/cart');
        }
    }
    return (
        <>   
        <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />     
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p> Kobe Furniture</p>
                <ul  className="nav-menu">
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
                <button class="menu-btn" onClick={toggleMenu}>
                      <img src={menu_icon} width={'30px'} height={'35x'} alt="" />
                </button>
            </div>
        </div>
        </>
    )
}

export default Navbar

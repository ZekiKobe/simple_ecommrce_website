// eslint-disable-next-line no-unused-vars
import React from 'react'
import './navbar.css'
import nav_profile from '../../assets/nav-profile.svg'
import furnitute from '../../assets/furnniture.png'
import menu_icon from '../../assets/menu2.png'

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-container">
            <img src={furnitute} alt="" />
            <h1>KF</h1>
            <img src={menu_icon} width={'30px'} height={'30px'} alt="" className='menu-icon' />
            </div>
            <img src={nav_profile} alt="" className="nav-profile" />
        </div>
    )
}

export default Navbar

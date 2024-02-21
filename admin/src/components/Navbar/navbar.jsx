// eslint-disable-next-line no-unused-vars
import React from 'react'
import './navbar.css'
import nav_logo from '../../assets/nav-logo.svg'
import nav_profile from '../../assets/nav-profile.svg'

function Navbar() {
    return (
        <div className="navbar">
            <img className='nav-logo' src={nav_logo} alt="" />
            <img src={nav_profile} alt="" className="nav-profile" />
        </div>
    )
}

export default Navbar

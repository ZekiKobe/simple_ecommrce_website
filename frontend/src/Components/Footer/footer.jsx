import React from 'react'
import './footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram.svg'
import whatsup_icon from '../Assets/whatsup.svg'
import linkedin_icon from '../Assets/linkedin.svg'
import telegram_icon from '../Assets/telegram.svg';
import facebook_icon from '../Assets/facebook.svg';


function Footer() {
    return (
       <div className="footer">
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>Kobe Furniture</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Our Offices</li>
            <li>Categories</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={whatsup_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={linkedin_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={facebook_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={telegram_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p style={{color:'white'}}>Copyright @2023 - All rights reserved</p>
        </div>
       </div> 
    )
}

export default Footer

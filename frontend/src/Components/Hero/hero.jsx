import React from 'react'
import './hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/bg_home.png'
import { Link } from 'react-scroll';

function Hero() {
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>Products for Everyone</p>
                </div>
                <Link className='hero-latest-btn'
            activeClass="active"
            to="newcollections"
            spy={true}
            smooth={true}
            offset={-70} // Adjust the offset as needed
            duration={500}
          >Latest Collections
<img src={arrow_icon} alt="" />
          </Link>
            </div>
            <div className="hero-right">
                 <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero

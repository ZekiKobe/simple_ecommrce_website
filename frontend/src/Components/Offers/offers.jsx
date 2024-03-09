import React, { useState, useEffect } from 'react'
import './offers.css'
import exlusive_image from '../Assets/ex_offer.png'

function Offers() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;
          const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;
    
          if (scrolledToBottom) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className={`offers ${isVisible ? 'visible' : ''}`}>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers for you</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check now</button>
            </div>
            <div className="offers-right">
                <img src={exlusive_image} alt="" />
            </div>
        </div>
    )
}

export default Offers

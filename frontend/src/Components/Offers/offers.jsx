import React from 'react'
import './offers.css'
import exlusive_image from '../Assets/ex_offer.png'

function Offers() {
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers for you</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check now</button>
            </div>
            <div className="offers right">
                <img src={exlusive_image} alt="" />
            </div>
        </div>
    )
}

export default Offers

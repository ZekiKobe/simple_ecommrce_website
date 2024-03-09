import React from 'react'
import './breadCrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

function BreadCrum(props) {
    const {product} = props
        return (
       <div className="breadCrum">
        HOME <img src={arrow_icon} alt="" />Categories <img src={arrow_icon} alt="" />{product?.category} <img src={arrow_icon} alt="" /> {product?.name}
       </div> 
    )
}

export default BreadCrum

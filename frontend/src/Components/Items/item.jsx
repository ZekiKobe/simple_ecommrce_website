import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'

function Item(props) {
        return (
            <div className="item">
                <Link to={`/product/${props.id}`}><img width={'250px'} height={'400px'} onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
                <p style={{color:'cyan',fontWeight:'bold'}}>{props.name}</p>
                <p>{props.description}</p>
                <div className="item-prices">
                    <div className="item-price-new">
                        ${props.new_price}
                    </div>
                    <div className="item-price-old">
                        ${props.old_price}
                    </div>
                </div>
            </div>
        )
   
}

export default Item

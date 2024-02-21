import React, { useContext } from 'react'
import './productDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { HomeContext } from '../../Context/homeContext'

function ProductDisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(HomeContext);
    return (
        <div className="product-display">
            <div className="product-display-left">
                <div className="product-display-imageList">
                    <img src={product?.image} alt="" />
                    <img src={product?.image} alt="" />
                    <img src={product?.image} alt="" />
                    <img src={product?.image} alt="" />
                </div>
                <div className="product-display-image">
                    <img className='productdisplay-main-img' src={product?.image} alt="" />
                </div>
            </div>
            <div className="product-display-right">
                <h1>{product?.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>{122}</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-older">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">
                    ${product.old_price}
                    </div>
                </div>
                <div className="product-display-right-description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium inventore, dolorem suscipit molestias labore debitis officiis, dicta perspiciatis ratione ipsum, a rem unde corrupti aut dolore minus! Quae, aperiam esse.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>one</div>
                        <div>two</div>
                        <div>three</div>
                        <div>four</div>
                        <div>five</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>dwedgjewhf efvhejwgfwje ewfgew</p>
                <p className='productdisplay-right-category'><span>Category :</span>dwedgjewhf efvhejwgfwje ewfgew</p>
            </div>
        </div>
    )
}

export default ProductDisplay

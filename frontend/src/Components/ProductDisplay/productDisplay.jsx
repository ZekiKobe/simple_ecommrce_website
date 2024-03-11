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
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-older">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">
                    ${product.new_price}
                    </div>
                </div>
                <div className="product-display-right-description">
                    {product?.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Type</h1>
                    <div className="productdisplay-right-sizes">
                        <div>Tables</div>
                        <div>Bed</div>
                        <div>Sofa</div>
                        <div>Chairs</div>
                        <div>Group Tables</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : {product?.category}</span></p>
                
            </div>
        </div>
    )
}

export default ProductDisplay

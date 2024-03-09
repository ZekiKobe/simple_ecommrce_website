import React, { useContext } from "react";
import remove_icon from "../Assets/cart_cross_icon.png";
import "./cartItems.css";
import { HomeContext } from "../../Context/homeContext";
import StripePayment from "../../Components/stripePayment";

function Carts() {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(HomeContext);
  return (
    <div className="cartitems">
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitem-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
                <StripePayment all_product={all_product} cartItems={cartItems}/>
        </div>
        <div className="cartitems-promocode">
          <p>If you have promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo codde" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carts;

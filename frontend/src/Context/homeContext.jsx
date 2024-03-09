import React, { createContext, useEffect, useState } from "react";


// Create the context
export const HomeContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
}
// Context Provider component
const HomeContextProvider = (props) => {
  // Check if all_product is not null
  const [all_product,setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_Product(data))

    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/getcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:"",
      }).then((response)=>response.json())
      .then((data)=>setCartItems(data));
    }

  },[])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({"itemId":itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({"itemId":itemId})
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            // Add a null check to ensure itemInfo is not undefined
            if (itemInfo && itemInfo.new_price) {
                totalAmount += itemInfo.new_price * cartItems[item];
            } else {
                console.error(`Product with ID ${item} not found or does not have a valid price.`);
            }
        }
    }
    return totalAmount;
}



  const getTotalCartItems = ()=>{
    let totalItem = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            totalItem+=cartItems[item]
        }
    }
    return totalItem
  }

  const contextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;

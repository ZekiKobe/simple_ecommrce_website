// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./listProduct.css";
import cross_icon from '../../assets/delete.png'
import plus_icon from '../../assets/plus.png'
import edit_icon from '../../assets/edit.png'

function ListProduct() {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {setAllProducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct = async (id) =>{
    await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="search-container">
        <input type="search" name="" id="" placeholder="Search here"/>
        <button>Search</button>
        <div className="add-product-btn-container">
          <button><img src={plus_icon} alt="" /></button>
        </div>
      </div>
      <div className="table-container">
      <table id="products" className="table-products">
        <th>ID</th>
        <th>Product Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Old Price</th>
        <th>New Price</th>
        <th>Category</th>
        <th>Remove</th>
        {allProducts.map((product)=>{
            return <>
            <tr>
                <td>{product.id}</td>
                <td><img src={product.image} alt="" className="listproduct-product-icon" /></td>
                <td><p>{product.name}</p></td>
                <td><p>{product.description}</p></td>
                <td><p>${product.old_price}</p></td>
                <td><p>${product.new_price}</p></td>
                <td><p>{product.category}</p></td>
                <td className="remove-edit-btn" ><img onClick={()=>{removeProduct(product.id)}} src={cross_icon} width={'30px'} height={'30px'} alt="" className="listproduct-remove-icon" />
                <button><img src={edit_icon} alt="" /></button>
                </td>
                </tr>
            
            </>     

        })}
      </table>
      </div>
      
    </div>
  );
}

export default ListProduct;

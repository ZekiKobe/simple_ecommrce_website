// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './addProduct.css'
import upload_area from '../../assets/upload_area.svg'

function AddProduct() {
    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler =(e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }


    const add_Product = async ()=>{
        console.log(productDetails);
        let resposnseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{resposnseData=data})
        if(resposnseData.success){
            product.image = resposnseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product)
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product addes"):alert("Failed!")
            })
        }
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product Description</p>
                <input type="text" value={productDetails.description} onChange={changeHandler} name='description' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" value={productDetails.category} onChange={changeHandler} className='add-product-selector'>
                    <option value="wood">Wood</option>
                    <option value="metal">Metal</option>
                    <option value="sofa">Sofa</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
            </div>
            <button className="addproduct-btn" onClick={add_Product}>
                ADD
            </button>
        </div>
    )
}

export default AddProduct

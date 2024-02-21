import React, { useState } from 'react'
import './CSS/loginSignup.css'

function LoginSignup() {

    const [state,setState] = useState("Login");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

    const login = async () =>{
        console.log("Login yesssssss",formData);

        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(FormData)
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }

    }

    const signup = async () =>{
        console.log("Signiup yessss",formData)

        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(FormData)
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }
    }

    const changeHandler =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <div className='loginSignup'>
            <div className="loginSignup-container">
                <h1>{state}</h1>
                <div className="loginSignup-fields">
                    {state==="Sign Up"?<input type="text" name="username" value={formData.username} onChange={changeHandler} id="" placeholder='Username'/>:<></>}
                    <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email address' />
                    <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Your password' />
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up"? <p className='loginsignup-login'>Already have an account?<span onClick={()=>{setState("Login")}}>Login here</span></p>:
                <p className='loginsignup-login'>Create an account?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing i agree to the terms and privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup

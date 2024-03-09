// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import cross_icon from '../../assets/delete.png'
import './listUsers.css'

function ListProduct() {
  const [allUsers, setAllUsers] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allusers')
      .then((res) => res.json())
      .then((data) => {setAllUsers(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  const removeUser = async (id) =>{
    await fetch('http://localhost:4000/removeuser',{
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
    <div className="list-users">
      <h1>All Users List</h1>
      <table id="products" className="table-products">
        <th>Id</th>
        <th>Full Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Remove</th>
        {allUsers.map((user)=>{
            return <>
            <tr>
                <td>{user.id}</td>
                <td><p>{user.fullName}</p></td>
                <td><p>{user.username}</p></td>
                <td><p>{user.email}</p></td>
                <td><p>{user.phoneNumber}</p></td>
                <td className="remove-edit-btn" ><img onClick={()=>{removeUser(user.id)}} src={cross_icon} width={'30px'} height={'30px'} alt="" className="listproduct-remove-icon" />
                </td>
                </tr>
            
            </>     

        })}
      </table>
    </div>
  );
}

export default ListProduct;

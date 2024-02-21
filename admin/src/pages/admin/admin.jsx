// eslint-disable-next-line no-unused-vars
import React from 'react'
import './admin.css'
import Sidebar from '../../components/Sidebar/sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../components/AddProduct/addProduct'
import ListProduct from '../../components/ListProduct/listProduct'

function Admin() {
    return (
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>}/>
                <Route path='/listproduct' element={<ListProduct/>}/>
            </Routes>
        </div>
    )
}
export default Admin

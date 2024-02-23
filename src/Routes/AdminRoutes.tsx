import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/SuperAdmin/AdminHome'
import AdminLogin from '../pages/SuperAdmin/AdminLogin'
import AdminPrivateRoute from '../components/SuperAdmin/AdminPrivateRoutes/AdminPrivateRoute'
import RetailerList from '../pages/SuperAdmin/RetailerList'
import ProductionList from '../pages/SuperAdmin/ProductionList'

function AdminRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element = {<AdminLogin/>}/>
        <Route element={<AdminPrivateRoute/>} >
            <Route path='/home' element={<AdminHome/>}/>
            <Route path='/retail' element={<RetailerList/>}/>
            <Route path= '/prod' element = {<ProductionList/>}/>
        </Route>
    </Routes>
    </>
  )
}

export default AdminRoutes
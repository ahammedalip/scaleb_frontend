import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductionSignup from '../pages/Production/Signup/ProductionSignup'
import ProductionLogin from '../pages/Production/Login/ProductionLogin'
import ProductionPrivateRoutes from '../components/Production/ProductionPrivateRoutes/ProductionPrivateRoutes'
import ProductionHome from '../pages/Production/home/ProductionHome'
import ProfilePage from '../pages/Production/Profile/ProfilePage'
import ShowReq from '../pages/Production/ViewRequest/Requests'

function ProductionRoutes() {
  return (
    
    <>
    <Routes>
        <Route path='/signup' element={<ProductionSignup/>}/>
        <Route path= '/login' element = {<ProductionLogin/>}/>
        <Route element = {<ProductionPrivateRoutes/>}>
            <Route path='/home' element = {<ProductionHome/>}/>
            <Route path='/profile' element= {<ProfilePage/>}/>
            <Route path='/requests' element={<ShowReq/>}/>
            
            
        </Route>
    </Routes>
    
    </>
  )
}

export default ProductionRoutes
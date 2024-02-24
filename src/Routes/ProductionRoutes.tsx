import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductionSignup from '../pages/Production/Signup/ProductionSignup'
import ProductionLogin from '../pages/Production/Login/ProductionLogin'
import ProductionPrivateRoutes from '../components/Production/ProductionPrivateRoutes/ProductionPrivateRoutes'
import ProductionHome from '../pages/Production/home/ProductionHome'

function ProductionRoutes() {
  return (
    
    <>
    <Routes>
        <Route path='/signup' element={<ProductionSignup/>}/>
        <Route path= '/login' element = {<ProductionLogin/>}/>
        <Route element = {<ProductionPrivateRoutes/>}>
            <Route path='/home' element = {<ProductionHome/>}/>
            
        </Route>
    </Routes>
    
    </>
  )
}

export default ProductionRoutes
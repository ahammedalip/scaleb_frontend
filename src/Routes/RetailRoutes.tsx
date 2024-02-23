import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RetailerLogin from '../pages/Retailer/RetailerLogin'
import RetailerSignUp from '../pages/Retailer/signup.tsx/RetailerSignUp'
import RetailerPrivateRoute from '../components/Retailer/RetailerPrivateRoutes/RetailerPrivateRoute'
import RetailerHome from '../pages/Retailer/home/RetailerHome'
import SalesExec from '../pages/Retailer/salesExec/SalesExec'

function RetailRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<RetailerLogin/>}/>
        <Route path= '/signup' element={<RetailerSignUp/>}/>
        <Route element={<RetailerPrivateRoute/>}>
            <Route path='/home' element={<RetailerHome/>}/>
            <Route path='/sales_exec' element={<SalesExec/>}/>

        </Route>
    </Routes>
    </>
  )
}

export default RetailRoutes
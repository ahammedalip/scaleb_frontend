import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RetailerLogin from '../pages/Retailer/RetailerLogin'
import RetailerSignUp from '../pages/Retailer/signup.tsx/RetailerSignUp'
import RetailerPrivateRoute from '../components/Retailer/RetailerPrivateRoutes/RetailerPrivateRoute'
import RetailerHome from '../pages/Retailer/home/RetailerHome'
import SalesExec from '../pages/Retailer/salesExec/SalesExec'
import ProductionList from '../pages/Retailer/ProductionList/ProductionList'
import ProfilePage from '../pages/Retailer/Profile/ProfilePage'
import IndProfileProd from '../components/Retailer/IndividualProfileProd/IndividualProfile'
import ProductionProfile from '../pages/Retailer/ProductionProfile/ProductionProfile'
import RetailOrder from '../pages/Retailer/Order/Order'

function RetailRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<RetailerLogin/>}/>
        <Route path= '/signup' element={<RetailerSignUp/>}/>
        <Route element={<RetailerPrivateRoute/>}>
            <Route path='/home' element={<RetailerHome/>}/>
            <Route path='/sales_exec' element={<SalesExec/>}/>
            <Route path='/prod_unit' element={<ProductionList/>}/>
            <Route path = '/profile' element = {<ProfilePage/>}/>
            <Route path='/prod/ind-profile' element= {<ProductionProfile/>}/>
            <Route path= '/order' element = {<RetailOrder/>}/>

        </Route>
    </Routes>
    </>
  )
}

export default RetailRoutes
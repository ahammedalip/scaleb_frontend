import React from 'react'
import {  Route,  Routes } from 'react-router-dom'
import SalesPrivateRoute from '../components/Sales/SalesPrivateRoutes/SalesPrivateRoute'
import SalesHome from '../pages/Sales/SalesHome'
import SalesProd from '../pages/Sales/SalesProd'

function SalesRoutes() {
    return (
        <>
            <Routes>
                <Route element={<SalesPrivateRoute/>}>
                    <Route path= '/home' element= {<SalesHome/>}/>
                    <Route path='/prod_unit' element = {<SalesProd/>}/>
                </Route>
            </Routes>

        </>
    )
}

export default SalesRoutes
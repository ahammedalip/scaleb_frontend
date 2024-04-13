import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/SuperAdmin/AdminHome'
import AdminLogin from '../pages/SuperAdmin/AdminLogin'
import AdminPrivateRoute from '../components/SuperAdmin/AdminPrivateRoutes/AdminPrivateRoute'
import RetailerList from '../pages/SuperAdmin/RetailerList'
import ProductionList from '../pages/SuperAdmin/ProductionList'
import RevenueList from '../pages/SuperAdmin/RevenueList'
import Report from '../pages/SuperAdmin/Report'

function AdminRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element = {<AdminLogin/>}/>
        <Route element={<AdminPrivateRoute/>} >
            <Route path='/home' element={<AdminHome/>}/>
            <Route path='/retail' element={<RetailerList/>}/>
            <Route path= '/prod' element = {<ProductionList/>}/>
            <Route path='/revenue' element = {<RevenueList/>}/>
            <Route path = '/report' element = {<Report/>}/>
        </Route>
    </Routes>
    </>
  )
}

export default AdminRoutes
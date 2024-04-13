import { Route, Routes } from 'react-router-dom'
import ProductionSignup from '../pages/Production/Signup/ProductionSignup'
import ProductionLogin from '../pages/Production/Login/ProductionLogin'
import ProductionPrivateRoutes from '../components/Production/ProductionPrivateRoutes/ProductionPrivateRoutes'
import ProductionHome from '../pages/Production/home/ProductionHome'
import ProfilePage from '../pages/Production/Profile/ProfilePage'
import ShowReq from '../pages/Production/ViewRequest/Requests'
import Orders from '../pages/Production/Orders/Orders'
import Messages from '../pages/Production/Messages/Messages'
import RetailerProfile from '../pages/Production/RetailersProfile/RetailerProfile'
import RetailerList from '../pages/Production/RetailerList/RetailerList'
import RetailerReqProfile from '../pages/Production/RetailersProfile/RetailerReqProf'
import Subscription from '../pages/Production/subscription/Subscription'
import Report from '../pages/Production/reports/Report'

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
            <Route path= '/order' element = {<Orders/>}/>
            <Route path='/messages' element ={<Messages/>}/>            
            <Route path= '/retailers' element = {<RetailerList/>}/>
            <Route path = '/retailer/ind-profile' element = {<RetailerProfile/>}/>
            <Route path = '/retailer/req-profile' element = {<RetailerReqProfile/>}/>
            <Route path= '/subscription' element= {<Subscription/>}/>
            <Route path='/report' element = {<Report/>}/>
        </Route>
    </Routes>
    
    </>
  )
}

export default ProductionRoutes
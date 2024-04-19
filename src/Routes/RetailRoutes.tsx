import { Route, Routes } from 'react-router-dom'
import RetailerLogin from '../pages/Retailer/RetailerLogin'
import RetailerSignUp from '../pages/Retailer/signup.tsx/RetailerSignUp'
import RetailerPrivateRoute from '../components/Retailer/RetailerPrivateRoutes/RetailerPrivateRoute'
import RetailerHome from '../pages/Retailer/home/RetailerHome'
import SalesExec from '../pages/Retailer/salesExec/SalesExec'
import ProductionList from '../pages/Retailer/ProductionList/ProductionList'
import ProfilePage from '../pages/Retailer/Profile/ProfilePage'
import ProductionProfile from '../pages/Retailer/ProductionProfile/ProductionProfile'
import RetailOrder from '../pages/Retailer/Order/Order'
import Subscription from '../pages/Retailer/subscription/Subscription'
import Report from '../pages/Retailer/Report'
import AvailableProd from '../pages/Retailer/ProductionList/AvailableProd'

function RetailRoutes() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<RetailerLogin />} />
        <Route path='/signup' element={<RetailerSignUp />} />
        <Route element={<RetailerPrivateRoute />}>
          <Route path='/home' element={<RetailerHome />} />
          <Route path='/sales_exec' element={<SalesExec />} />
          <Route path='/conn_prod_unit' element={<ProductionList />} />
          <Route path='/avail_prod_unit' element={<AvailableProd />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/prod/ind-profile' element={<ProductionProfile />} />
          <Route path='/order' element={<RetailOrder />} />
          <Route path='/subscription-plans' element={<Subscription />} />
          <Route path='/report' element={<Report />} />
        </Route>
      </Routes>
    </>
  )
}

export default RetailRoutes
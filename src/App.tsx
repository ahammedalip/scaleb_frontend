import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import SignupLanding from './pages/SignupLanding'
import AdminRoutes from './Routes/AdminRoutes'
import RetailRoutes from './Routes/RetailRoutes'
import ProductionRoutes from './Routes/ProductionRoutes'
import SalesRoutes from './Routes/SalesRoute'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFailed from './components/PaymentFailed'



const  App: React.FC=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/action' element={<SignupLanding />} />
        <Route path='/admin/*' element={<AdminRoutes/>} />
        <Route path='/retail/*' element={<RetailRoutes/>}/>
        <Route path='/sales/*' element= {<SalesRoutes/>}/>
        <Route path='/production/*' element={<ProductionRoutes/>}/>
        <Route path= '/success' element= {<PaymentSuccess/>}/>
        <Route path= '/failed' element= {<PaymentFailed/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
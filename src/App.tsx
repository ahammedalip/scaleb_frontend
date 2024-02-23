import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import SignupLanding from './pages/SignupLanding'
import SalesHome from './pages/Sales/SalesHome'
import AdminRoutes from './Routes/AdminRoutes'
import RetailRoutes from './Routes/RetailRoutes'
import ProductionRoutes from './Routes/ProductionRoutes'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/action' element={<SignupLanding />} />
        <Route path='/admin/*' element={<AdminRoutes/>} />
        <Route path='/retail/*' element={<RetailRoutes/>}/>
        <Route path='/sales/home' element= {<SalesHome/>}/>
        <Route path='/production/*' element={<ProductionRoutes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
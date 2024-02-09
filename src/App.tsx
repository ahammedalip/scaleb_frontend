import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import SignupLanding from './pages/SignupLanding'
import Header from './components/header/Header'
import AdminLogin from './pages/SuperAdmin/AdminLogin'
import AdminHome from './pages/SuperAdmin/AdminHome'
import RetailerSignUp from './pages/Retailer/signup.tsx/RetailerSignUp'
import RetailerLogin from './pages/Retailer/RetailerLogin'
import RetailerHome from './pages/Retailer/home/RetailerHome'
import ProductionSignup from './pages/Production/Signup/ProductionSignup'
import ProductionLogin from './pages/Production/Login/ProductionLogin'


function App() {
  return (
    <BrowserRouter>
    <Header/>
    
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/action' element={<SignupLanding/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/home' element={<AdminHome/>} />
      <Route path= '/retail/signup' element={<RetailerSignUp/>} />
      <Route path='/retail/login' element={<RetailerLogin/>}/>
      <Route path='/retail/home' element={<RetailerHome/>}/>
      <Route path='/production/signup' element={<ProductionSignup/>}/>
      <Route path='/production/login' element = {<ProductionLogin/>}/>
    </Routes>
    
   
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import Header from './components/header/header'
import SignupLanding from './pages/SignupLanding'
import AdminLogin from './pages/SuperAdmin/AdminLogin'
import AdminHome from './pages/SuperAdmin/AdminHome'
import RetailerSignUp from './pages/Retailer/signup.tsx/RetailerSignUp'


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
    </Routes>
    
   
    </BrowserRouter>
  )
}

export default App
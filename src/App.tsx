import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import Header from './components/header/header'
import SignupLanding from './pages/SignupLanding'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/action' element={<SignupLanding/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
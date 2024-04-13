import Header from '../../components/header/Header'
import Retailerlogin from '../../components/Retailer/login/Retailer.login'
import './login.css'
function RetailerLogin() {
  return (
    <div>
      <Header />
      <div className='bg-image h-screen pt-20'>

      <Retailerlogin />
      </div>
    </div>
  )
}

export default RetailerLogin
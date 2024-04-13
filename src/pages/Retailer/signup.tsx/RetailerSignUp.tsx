import Retailersignup from "../../../components/Retailer/signup/Retailer.signup"
import Header from "../../../components/header/Header"
import './RetailerSignup.css'

function RetailerSignUp() {
  return (
    <div>
      <Header/>
      <div className="pt-20 bg-grad h-screen" >

      <Retailersignup/>
      </div>
    </div>
  )
}

export default RetailerSignUp
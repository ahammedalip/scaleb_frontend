import { SignupProd2 } from '../../../components/Production/Signup/SignupProd2'
// import {SignupProduction} from '../../../components/Production/Signup/SignupProduction'
import  Header  from '../../../components/header/Header'
import './prod.css'


export const ProductionSignup: React.FC = () => {
  return (
    <div>
      <Header />
      {/* <SignupProduction /> */}
      <div className='body-bg h-screen pt-20'>

      <SignupProd2/>
      </div>
    </div>
  )
}


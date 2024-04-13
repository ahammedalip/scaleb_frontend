import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import IndProfileProd from '../../components/Sales/ProducitonProfile/ProductionProfile'

function IndividualProdProfile() {
  return (
    <div>
        <Header/>
        <div className='bg-red-50/40 pt-20 min-h-screen flex space-x-4'>
          <div className='w-1/5'>
            <SalesMenu/>
          </div>
            <div className='w-9/12 pb-4'>
            <IndProfileProd/>
            </div>           

        </div>
    </div>
  )
}

export default IndividualProdProfile
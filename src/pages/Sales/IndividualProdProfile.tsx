import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import IndProfileProd from '../../components/Sales/ProducitonProfile/ProductionProfile'

function IndividualProdProfile() {
  return (
    <div>
        <Header/>
        <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static md:w-1/4 w-full bottom-2'>
            <SalesMenu/>
          </div>
            <div className='sm:w-9/12 pb-4 pr-5'>
            <IndProfileProd/>
            </div>           

        </div>
    </div>
  )
}

export default IndividualProdProfile
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import IndProfileProd from '../../../components/Retailer/IndividualProfileProd/IndividualProfile'

function ProductionProfile() {
  return (
    <>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static bottom-1 left-48' >
          <RetailerMenu />
        </div>

        <div className='sm:w-8/12 min-h-screen pb-2 px-2 overflow-y-auto' >
          <IndProfileProd />
        </div>
      </div>
    </>
  )
}

export default ProductionProfile
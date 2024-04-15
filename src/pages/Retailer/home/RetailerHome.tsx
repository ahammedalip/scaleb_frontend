
import HomeRetailer from '../../../components/Retailer/home/Home.retailer'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import Header from '../../../components/header/Header'
function RetailerHome() {



  return (
    <div>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static bottom-1 '>
          <RetailerMenu />
        </div>
        <div className=' h-screen sm:w-9/12'>
          <HomeRetailer />

        </div>
      </div>
    </div>
  )
}

export default RetailerHome
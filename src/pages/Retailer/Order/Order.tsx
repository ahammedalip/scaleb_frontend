
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import Orders from '../../../components/Retailer/Orders'

export default function RetailOrder() {
  return (
    <div>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
       <div className='fixed sm:static bottom-1 left-12'>
        <RetailerMenu />
       </div>
       <div className='bottom-72 sm:w-9/12'>

        <Orders />
       </div>
      </div>
    </div>
  )
}

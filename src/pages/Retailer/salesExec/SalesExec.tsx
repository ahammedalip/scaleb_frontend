import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import SalesList from '../../../components/Retailer/salesExec/Sales.Exec'
import Header from '../../../components/header/Header'

function SalesExec() {
  return (

  <div>
    <Header/>
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static bottom-1 left-52'>

      <RetailerMenu/>
        </div>
        <div className='h-screen sm:w-9/12'>

      <SalesList/>
        </div>
    
    </div>
  </div>
  )
}

export default SalesExec
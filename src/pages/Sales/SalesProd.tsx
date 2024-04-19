import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import ProductionList from '../../components/Sales/ProductionList/ProductionList'

function SalesProd() {
  return (
    <div>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static md:w-1/4 w-full bottom-2'>
          <SalesMenu />
        </div>
        <div className='sm:w-9/12'>

        <ProductionList />
        </div>

      </div>
    </div>
  )
}

export default SalesProd
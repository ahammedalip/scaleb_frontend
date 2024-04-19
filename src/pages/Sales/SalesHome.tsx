import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import Saleshome from '../../components/Sales/Home/Sales.Home'
import Header from '../../components/header/Header'

function SalesHome() {
  return (
    <div className=''>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static md:w-1/4 w-full bottom-1'>
          <SalesMenu />
         
        </div>
        <div className='sm:w-9/12 h-screen'>
          <Saleshome />
        </div>
      </div>

    </div>
  )
}

export default SalesHome
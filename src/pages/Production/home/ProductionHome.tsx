import Header from '../../../components/header/Header'
import Productionhome from '../../../components/Production/Home/Production.Home'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'

function ProductionHome() {
  return (
    <div className=''>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static md:w-1/4 w-full'>

          <ProductionMenu />
        </div>
        <div className='w-[90%] pr-5 '>

        <Productionhome />
        </div>
      </div>
    </div>
  )
}

export default ProductionHome

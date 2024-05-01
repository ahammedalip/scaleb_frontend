import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import RetailersList from '../../../components/Production/RetailerProfile/Retailers.List'

export default function RetailerList() {
  return (
    <div>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='bottom-3 fixed sm:static md:w-1/4 w-full'>
          <ProductionMenu />
        </div>
        <div className='sm:w-9/12'>

        <RetailersList />
        </div>
      </div>
    </div>
  )
}

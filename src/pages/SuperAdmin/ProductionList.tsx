import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'
import Productionlist from '../../components/SuperAdmin/ProductionList/ProductionList'

function ProductionList() {
  return (
    <div className=''>
    <Header/>
    <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static bottom-1'>
        <Menu/>
      </div>
      <div className='w-9/12 h-screen'>

        <Productionlist/>
      </div>
    </div>

  </div>
  )
}

export default ProductionList
import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import Order from '../../../components/Production/Order/Order'

function Orders() {
  return (
    <div>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>

        <div className='fixed bottom-8 sm:static md:w-1/4 w-full'>

          <ProductionMenu />
        </div>
     

          <Order />
  

      </div>

    </div >
  )
}

export default Orders
import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import Order from '../../../components/Production/Order/Order'

function Orders() {
  return (
    <div>
        <Header/>
        <div className='bg-red-50/40 min-h-screen pt-20 flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 pb-10'>
      
            <ProductionMenu/>
            <Order/>

        </div>

    </div>
  )
}

export default Orders
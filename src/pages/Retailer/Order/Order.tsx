
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import Orders from '../../../components/Retailer/Orders'

export default function RetailOrder() {
  return (
    <div>
<Header/>
<div className='bg-red-50/40 min-h-screen pt-20 flex space-x-4'>
    <RetailerMenu/>
    <Orders/>
</div>
    </div>
  )
}

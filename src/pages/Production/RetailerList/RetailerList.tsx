import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import RetailersList from '../../../components/Production/RetailerProfile/Retailers.List'

export default function RetailerList() {
  return (
    <div>
        <Header/>
        <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
                <ProductionMenu/>
                <RetailersList/>
            </div>
    </div>
  )
}

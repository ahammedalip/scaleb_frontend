import ProductionAvailable from '../../../components/Retailer/ProductionUnits/AvailableProduction'
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import ProductionConnected from '../../../components/Retailer/ProductionUnits/AssociatedProduction'

function ProductionList() {
    return (
        <div>
            <Header />
            
            <div className='bg-red-50/40 min-h-screen flex pt-20 space-x-7'>
                <div className='w-1/5'>
                <RetailerMenu />
                </div>
                <div className='w-4/6 space-y-5'>
                <ProductionConnected />
                <ProductionAvailable />
                </div>
               
            </div>

        </div>
    )
}

export default ProductionList
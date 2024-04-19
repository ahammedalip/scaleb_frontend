// import ProductionAvailable from '../../../components/Retailer/ProductionUnits/AvailableProduction'
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import ProductionConnected from '../../../components/Retailer/ProductionUnits/AssociatedProduction'

function ProductionList() {
    return (
        <div>
            <Header />
            
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static bottom-1 left-12'>
                <RetailerMenu />
                </div>
                <div className=' space-y-5 pb-16 sm:w-9/12'>
                <ProductionConnected />
                </div>
               
            </div>

        </div>
    )
}

export default ProductionList
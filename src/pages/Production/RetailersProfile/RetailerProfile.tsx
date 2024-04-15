import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import RetailerProf from '../../../components/Production/RetailerProfile/Retailer.Profile'

export default function RetailerProfile() {
    return (
        <div>
            <Header/>
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static  w-full sm:w-1/5 '>
                <ProductionMenu/>
                </div>
                    
                <RetailerProf/>
            </div>
    </div>
    )
}

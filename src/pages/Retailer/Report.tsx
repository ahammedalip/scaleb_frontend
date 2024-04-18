import Header from '../../components/header/Header'

import RetailerReport from '../../components/Retailer/RetailerReport/RetailerReport'
import RetailerMenu from '../../components/Retailer/menu/RetailerMenu'

export default function Report() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static z-10 left-48 bottom-1'>

                    <RetailerMenu />
                </div>
                <div className='h-screen'>

                <RetailerReport />
                </div>
            </div>
        </div>
    )
}

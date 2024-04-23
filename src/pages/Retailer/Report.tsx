import Header from '../../components/header/Header'

import RetailerReport from '../../components/Retailer/RetailerReport/RetailerReport'
import RetailerMenu from '../../components/Retailer/menu/RetailerMenu'

export default function Report() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static z-10 left-12 bottom-1'>

                    <RetailerMenu />
                </div>
                <div className='h-screen sm:h-[600px] sm:w-9/12'>

                <RetailerReport />
                </div>
            </div>
        </div>
    )
}

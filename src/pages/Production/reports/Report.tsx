import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import ReportsProd from '../../../components/Production/ReportsProd'

export default function Report() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 sm:h-screen h-screen pt-20 space-x-5'>
                <div className='fixed sm:static md:w-1/4 w-full z-10  '>
                    <ProductionMenu />
                </div>

                <div className='sm:w-9/12'>

                    <ReportsProd />
                </div>

            </div>
        </div >
    )
}

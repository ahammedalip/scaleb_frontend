import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import ReportsProd from '../../../components/Production/ReportsProd'

export default function Report() {
    return (
        <div>
            <Header />
            <div className='pt-20 bg-red-50/40 flex h-screen space-x-5'>
                <div className='w-1/5'>

                    <ProductionMenu />
                </div>
                <div className='w-9/12'>

                <ReportsProd />
                </div>
            </div>
        </div>
    )
}

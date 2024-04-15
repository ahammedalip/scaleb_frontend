import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import RequestProfile from '../../../components/Production/Requests/Request.profile'

export default function RetailerReqProfile() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static md:w-1/4 w-full'>
                <ProductionMenu />
                </div>
                <RequestProfile />
            </div>
        </div>
    )
}

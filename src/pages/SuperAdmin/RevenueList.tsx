import Revenuelist from '../../components/SuperAdmin/Revenue/Revenue.list'
import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'

export default function RevenueList() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static bottom-1'>
                <Menu/>
                </div>
                <div className='sm:w-9/12 h-screen'>

                <Revenuelist />
                </div>

            </div>

        </div>
    )
}

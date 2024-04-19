
import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'
import ReportAdmin from '../../components/SuperAdmin/Report/ReportAdmin'

export default function Report() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className='fixed sm:static bottom-1'>
                <Menu />
               </div>
               <div className='h-screen sm:w-9/12'>

                <ReportAdmin />
               </div>
            </div>
        </div>
    )
}

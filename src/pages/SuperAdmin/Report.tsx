
import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'
import ReportAdmin from '../../components/SuperAdmin/Report/ReportAdmin'

export default function Report() {
    return (
        <div>
            <Header />
            <div className='pt-20 bg-red-50/40 flex space-x-5 h-screen'>
                <Menu />
                <ReportAdmin />
            </div>
        </div>
    )
}

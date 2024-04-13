import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import AdditionalMenu from '../../components/Sales/Menu/AdditionalMenu'

function Profile() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40  min-h-screen pt-20'>
                <div className='w-1/5 space-y-4'>
                <SalesMenu />

                <AdditionalMenu />
                </div>    
                    
               
            </div>
        </div>
    )
}

export default Profile
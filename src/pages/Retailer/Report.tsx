import Header from '../../components/header/Header'

import RetailerReport from '../../components/Retailer/RetailerReport/RetailerReport'
import RetailerMenu from '../../components/Retailer/menu/RetailerMenu'

export default function Report() {
    return (
        <div>
            <Header/>
            <div className='pt-20 bg-red-50/40 flex space-x-5 h-screen'>
              <RetailerMenu/>  
                <RetailerReport/>
            </div>
        </div>
    )
}

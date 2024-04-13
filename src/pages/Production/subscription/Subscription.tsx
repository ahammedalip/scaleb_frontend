import Header from '../../../components/header/Header'
import SubscriptionPlans from '../../../components/Subsription.Plans'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import AdditionalMenu from '../../../components/Retailer/menu/AdditionalMenu'



export default function Subscription() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40 pt-20 flex space-x-4 h-screen'>
                <div className='space-y-5'>
                    <RetailerMenu />
                    <AdditionalMenu />
                </div>
                <div className='w-9/12'>
                  

                        <SubscriptionPlans role= 'production'/>
                
                </div>

            </div>
        </div>
    )
}

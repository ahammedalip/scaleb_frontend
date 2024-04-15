import Header from '../../../components/header/Header'
import SubscriptionPlans from '../../../components/Subsription.Plans'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'



export default function Subscription() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static md:w-1/4 w-full'>
                    <RetailerMenu />
                    {/* <AdditionalMenu /> */}
                </div>
                <div className='sm:w-9/12 h-screen'>
                  

                        <SubscriptionPlans role= 'production'/>
                
                </div>

            </div>
        </div>
    )
}

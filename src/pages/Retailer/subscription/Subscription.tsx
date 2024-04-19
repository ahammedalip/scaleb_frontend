import Header from '../../../components/header/Header'
import SubscriptionPlans from '../../../components/Subsription.Plans'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
// import AdditionalMenu from '../../../components/Retailer/menu/AdditionalMenu'



export default function Subscription() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static bottom-0 left-12 space-y-5'>
                    <RetailerMenu />
                    {/* <AdditionalMenu /> */}
                </div>
                <div className='sm:w-9/12 pb-24 sm:pb-1'>


                    <SubscriptionPlans role='retailer' />

                </div>

            </div>
        </div>
    )
}

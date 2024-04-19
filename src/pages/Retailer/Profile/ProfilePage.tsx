import Header from '../../../components/header/Header';
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu';
import AdditionalMenu from '../../../components/Retailer/menu/AdditionalMenu';
import ProfileRet from '../../../components/Retailer/Profile/ProfileRetail';


function ProfilePage() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static bottom-1 left-12 space-y-5'>
                   
                        <RetailerMenu />
                        <AdditionalMenu/>
                   
                </div>

                <div className='sm:w-8/12  h-screen'>
                    <ProfileRet/>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

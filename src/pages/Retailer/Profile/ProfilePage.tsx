import Header from '../../../components/header/Header';
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu';
import AdditionalMenu from '../../../components/Retailer/menu/AdditionalMenu';
import ProfileRet from '../../../components/Retailer/Profile/ProfileRetail';


function ProfilePage() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
                <div className='w-1/5 space-y-5'>
                   
                        <RetailerMenu />
                        <AdditionalMenu/>
                   
                </div>

                <div className='w-8/12  h-screen'>
                    <ProfileRet/>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

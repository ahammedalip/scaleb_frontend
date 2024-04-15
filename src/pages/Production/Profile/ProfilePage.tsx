import Header from '../../../components/header/Header';
import ProfileProd from '../../../components/Production/Profile/Profile.Prod';
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu';
import AdditionalMenu from '../../../components/Production/AdditionalMenu/AdditionalMenu';

function ProfilePage() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static md:w-1/4 w-full'>
                    <div className='space-y-5'>
                        <ProductionMenu />
                        <AdditionalMenu/>
                    </div>
                </div>
                
                <div className='sm:w-8/12 h-screen'>
                   

                    <ProfileProd />
                
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

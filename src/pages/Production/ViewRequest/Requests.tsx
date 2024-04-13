import Header from '../../../components/header/Header';
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu';
import AdditionalMenu from '../../../components/Production/AdditionalMenu/AdditionalMenu';
import AvailableRequests from '../../../components/Production/Requests/Requests';

function ShowReq() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
                <div className='w-1/5'>
                    <div className='space-y-5'>
                        <ProductionMenu />
                        <AdditionalMenu />
                    </div>
                </div>

                <div className='w-8/12 h-screen'>
                    <AvailableRequests />

                </div>
            </div>
        </div>
    );
}

export default ShowReq;

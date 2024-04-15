import Header from '../../../components/header/Header';
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu';
import AvailableRequests from '../../../components/Production/Requests/Requests';

function ShowReq() {
    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
                <div className='fixed sm:static bottom-3 md:w-1/4 w-full'>
                        <ProductionMenu />
                </div>

                <div className='sm:w-9/12 h-screen'>
                    <AvailableRequests />

                </div>
            </div>
        </div>
    );
}

export default ShowReq;

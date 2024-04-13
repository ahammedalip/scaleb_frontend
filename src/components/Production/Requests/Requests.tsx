import { useEffect, useState } from 'react';
import api from '../../../axios/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AvailableRequests() {
    const [requestedRetailers, setRequestedRetailers] = useState([]);
    const [acceptedRetailers, setAcceptedRetailers] = useState<{ [key: string]: boolean }>({});


    const navigate = useNavigate()

    useEffect(() => {
        fetchRequestedRetailers();
    }, []);

    const fetchRequestedRetailers = async () => {
        try {
            const response = await api.get('/production/requests');
            const result = response.data;
            if (result.success == true) {
                const data = result.userDetails;
                setRequestedRetailers(data)

                data.forEach((item: {
                    retailerName: string,
                    _id: number
                }) => {
                    console.log('Retailer Name:', item.retailerName);
                    console.log('ObjectId:', item._id);
                });
            }

        } catch (error) {
            console.log('error fetching available productions', error)
        }
    }
    const handleAcceptClick = async (id: string) => {
        const response = await api.post(`/production/acc-req`, { id })
        console.log('coming here', id)

        const data = response.data;
        if (data.success == true && data.message == 'already connected') {
            toast.success('Already connected')
            setAcceptedRetailers(prev => ({ ...prev, [id]: true }));
        } else if (data.success == true && data.message == 'User connected') {
            toast.success('Succesfully connected')
            setAcceptedRetailers(prev => ({ ...prev, [id]: true }));
            fetchRequestedRetailers();
        }
        else {
            toast.error('Please try again')
        }
    }

    const handleViewClick = async (profileId: string) => {
        navigate(`/production/retailer/req-profile?id=${profileId}`)

    }

    const handleRejectClick = async (profileId: string) => {
        try {
            const response = await api.delete(`/production/delete-req?id=${profileId}`);

            if (response.data.success) {
                toast.success(response.data.message)
                fetchRequestedRetailers();
            }
        } catch (error) {
            console.log('error in rejecting the request')
            toast.error('Something went wrong, please try again')
        }
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-5'>
            <div className='text-center'>
                <h1 className='heading1 font-bold' style={{ fontSize: '1.5rem' }}>Requests</h1>
            </div>
            {requestedRetailers.length == 0 ? (
                <div className='text-center p-5 h-40'>
                    <p>No pending requests</p>
                </div>
            ) : (
                <div className='profile text-center p-5 flex space-x-5'>
                    {requestedRetailers.map((item: {
                        _id: string,
                        retailerName: string
                    }, index) => (
                        <>

                            <div className=' shadow border border-gray-300 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 '>

                                <div key={index} className='flex flex-col items-center justify-center p-3'>
                                    <img key={index} src='../../../../public/images/Product_pro.png' alt={item.retailerName} className='w-24 rounded-md text-center border-gray-400 shadow-gray-400 shadow-md' />
                                    <div>
                                        <h2 >{item.retailerName}</h2>
                                    </div>
                                    <div className='flex'>
                                        <div className='p-1'>
                                            <button className='bg-pink-500/85 hover:bg-pink-700 hover:text-white p-2  rounded-md shadow-md ease-in-out duration-200' onClick={() => handleViewClick(item._id)}>View</button>
                                        </div>
                                        {!acceptedRetailers[item._id] && (

                                            <div className='p-1'>
                                                <button className='bg-blue-500/85 hover:bg-green-700 hover:text-white p-2  rounded-md shadow-md ease-in-out duration-200' onClick={() => handleAcceptClick(item._id)}>Accept</button>
                                            </div>
                                        )}
                                        <div className='p-1'>
                                            <button className='bg-red-500 hover:bg-red-700 hover:text-white p-2  rounded-md shadow-md ease-in-out duration-200' onClick={() => handleRejectClick(item._id)}> Reject</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>


                    ))}
                </div>
            )}



        </div>
    );
}

export default AvailableRequests;




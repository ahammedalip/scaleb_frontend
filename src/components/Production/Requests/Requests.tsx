import React, { useEffect, useState } from 'react';
import api from '../../../axios/api';
import toast from 'react-hot-toast';

function AvailableRequests() {
    const [requestedRetailers, setRequestedRetailers] = useState([]);
    const [acceptedRetailers, setAcceptedRetailers] = useState({});

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
                }, index: number) => {
                    console.log('Retailer Name:', item.retailerName);
                    console.log('ObjectId:', item._id);
                });
            }

        } catch (error) {
            console.log('error fetching available productions', error)
        }
    }
    const handleAcceptClick = async (id: number) => {
        const response = await api.post(`/production/acc-req`, { id })
        console.log('coming here', id)

        const data = response.data;
        if (data.success == true && data.message == 'already connected') {
            toast.success('Already connected')
            setAcceptedRetailers(prev => ({ ...prev, [id]: true }));
        } else if (data.success == true && data.message == 'User connected') {
            toast.success('Succesfully connected')
            setAcceptedRetailers(prev => ({ ...prev, [id]: true }));
        }
        else {
            toast.error('Please try again')
        }
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-5'>
            <div className='text-center'>
                <h1 className='heading1'>Requests</h1>
            </div>

            <div className='profile text-center p-5 flex'>
                {requestedRetailers.map((item: {
                    _id: number,
                    retailerName: string
                }, index) => (
                    <div className=' shadow border border-gray-300 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200'>
                        <div key={index} className='flex flex-col items-center justify-center p-3'>
                            <img key={index} src='../../../../public/images/Product_pro.png' alt={item.retailerName} className='w-24 rounded-md text-center border-gray-400 shadow-gray-400 shadow-md' />
                            <div>
                                <h2 >{item.retailerName}</h2>
                            </div>
                            <div className='flex'>
                                <div className='p-1'>
                                    <button className='bg-pink-500/85 hover:bg-pink-700 hover:text-white p-2  rounded-md shadow-md' onClick={() => handleViewClick(item._id)}>View</button>
                                </div>
                                {!acceptedRetailers[item._id] && (

                                <div className='p-1'>
                                    <button className='bg-blue-500/85 hover:bg-green-700 hover:text-white p-2  rounded-md shadow-md' onClick={() => handleAcceptClick(item._id)}>Accept</button>
                                </div>
                                   )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default AvailableRequests;




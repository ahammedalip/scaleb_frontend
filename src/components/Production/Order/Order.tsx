import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';


interface Order {
    _id: string
    productionName: string;
    // productionId: string;
    salesExecId: string;
    retailerId: string;
    scheduledDate: Date;
    imageURL: string[];
    quantity: number;
    status: string;
    blocked: boolean;
    accepted: string;
    description: string;
    item: string;
    updateRequest: string;


}

function Order() {
    const [availableOrders, setAvailableOrders] = useState([])
    const [filter, setFilter] = useState('All');
    
    useEffect(() => {
        fetchOrder()
    }, [])
    const fetchOrder = async () => {
        const request = await api.get('/production/orders')
        const response = request.data
        console.log('result', response);
        if (response.success) {
            const sortedOrders = response.orders.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
            setAvailableOrders(sortedOrders);
        }
    }

    const handleAccept = async (orderId: string) => {
        console.log(orderId)
        const orderDetails = {
            orderId
        }
        try {
            const request = await api.patch('/production/order-acc', orderDetails)
            const response = request.data
            if (response.success) {
                toast.success('Congratulations! Order Accepted')
                fetchOrder()
            } else {
                toast.error('Something went wrong, Please try again')
            }
        } catch (error) {
            console.log('error at accepting order', error);
            toast.error('Something went wrong!')
        }
    }

    const handleReject = async(orderId:string) =>{
        
        console.log(orderId)
        const orderDetails = {
            orderId
        }
        try {
            const request = await api.patch('/production/order-rej', orderDetails)
            const response = request.data
            if (response.success) {
                toast.success('Congratulations! Order rejected')
                fetchOrder()
            } else {
                toast.error('Something went wrong, Please try again')
            }
        } catch (error) {
            console.log('error at rejecting order', error);
            toast.error('Something went wrong!')
        }
    }


    return (

        <div className='bg-white rounded-md shadow-md w-full sm:w-8/12 md:w-9/12 lg:w-9/12 xl:w-9/12 pb-5'>
            <div className='p-3'>


                <div className='p-5 text-center underline'>
                    <h1 className='text-2xl'>Orders</h1>
                </div>
                <div className='pl-3 space-x-2 p-2' >
                    <button onClick={() => setFilter('Pending')} className='bg-pink-400 p-2 rounded-sm hover:bg-pink-600 text-white'>Pending</button>
                    <button onClick={() => setFilter('Completed')} className='bg-pink-500 p-2 rounded-sm hover:bg-pink-700 text-white'>Completed</button>
                    <button onClick={() => setFilter('Requests')} className='bg-pink-600 p-2 rounded-sm hover:bg-pink-800 text-white'>Requests</button>
                    <button onClick={() => setFilter('All')} className='bg-pink-700 p-2 rounded-sm hover:bg-pink-900 text-white'>All</button>
                </div>
                {availableOrders.length > 0 ? (
                    <div className='space-y-5 '>
                        {availableOrders.filter(order => {
                            switch (filter) {
                                case 'Pending':
                                    return order.status === 'Pending' && order.accepted === 'Yes';
                                case 'Completed':
                                    return order.status === 'Completed';
                                case 'Requests':
                                    return order.accepted === 'No';
                                default:
                                    return true;
                            }
                        }).map((order: Order, index) => { // Corrected the order of arguments
                            return (
                                <div key={index} className='space-y-3 bg-gray-200 rounded-md p-4'>
                                    {order.accepted == 'No' ? (
                                        <div className='p-2 rounded-md hover:border-black space-x-5 text-center border border-gray-300  bg-white'>
                                            <h1>Do you want accept the order?</h1>
                                            <button className='bg-green-700 text-white rounded-full px-3 py-2 hover:bg-black hover:text-white hover:shadow-md' onClick={() => handleAccept(order._id)}>Accept</button>
                                            <button className='bg-red-600 text-white rounded-full px-3 py-2 hover:bg-black hover:text-white hover:shadow-md' onClick={()=>handleReject(order._id)}>Reject</button>
                                        </div>
                                    ) : null}
                                    <div className='p-2 flex justify-evenly text-xl'>
                                        <h1>Sales Executive: {order.salesExecId.username}</h1>
                                        <h1>Retailer : {order.retailerId.retailerName}</h1>
                                    </div>
                                    <div className='flex justify-evenly'>
                                        {order.accepted == 'Yes' ? (
                                    

                                            <div>
                                                <h1>hello</h1>
                                            </div>
                                        ) : null}


                                    </div>
                                    <div className='flex justify-evenly'>
                                        <h1>Item:{order.item} </h1>
                                        <h1>Quantity:{order.quantity} </h1>
                                        <h1>Delivery:{new Date(order.scheduledDate).toLocaleDateString()} </h1>

                                    </div>
                                    <div className='px-5 p-2 bg-gray-100 rounded-lg'>
                                        <h1 className='text-left pl-2'>Description:</h1>
                                        <p className='text-left pl-2'>{order.description}</p>
                                    </div>
                                    <div className='px-5'>
                                        <h1>Images:</h1>
                                        <div className='flex space-x-3 justify-center'>
                                            {order.imageURL.map((url, idx) => (
                                                <img key={idx} src={url} alt="" className=' bg-white w-32 h-32 rounded-md shadow-lg object-cover' />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className='text-center'>
                        <h1 className='text-red-600'>No orders available</h1>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Order
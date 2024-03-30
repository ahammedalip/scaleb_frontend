import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";
import ReactPaginate from 'react-paginate';

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
    // username:string;
    // retailerName:string;


}

function Order() {
    const [availableOrders, setAvailableOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchOrder(currentPage, 10); // Assuming 10 items per page
    }, [currentPage, filter]);


    // useEffect(() => {
    //     fetchOrder()
    // }, [])

    // const fetchOrder = async () => {
    //     setLoading(true)
    //     try {
    //         const request = await api.get('/production/orders', {

    //         })
    //         const response = request.data
    //         console.log('result', response);
    //         if (response.success) {
    //             const sortedOrders = response.orders.sort((a: Order, b: Order) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
    //             setAvailableOrders(sortedOrders);
    //             setTotalPages(response.totalPages)

    //             setLoading(false)
    //         }
    //     } catch (error) {
    //         console.log('error while fetching data', error)
    //     }

    // }
    const fetchOrder = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            let url = `/production/orders?page=${page}`;
            if (filter !== 'All') {
                url += `&filter=${filter}`;
            } else {
                url += `&filter=${'All'}`;
            }
            const response = await api.get(url);
            const sortedOrders = response.data.orders.sort((a: Order, b: Order) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
            setAvailableOrders(sortedOrders);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.log('Error while fetching data:', error);
            setLoading(false);
        }
    };


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

    const handleReject = async (orderId: string) => {

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

    const handlePermitEdit = async (orderId: string, role: string) => {
        const id = {
            orderId,
            role
        }
        const request = await api.patch('/production/edit-acc', id)
        const response = request.data

        if (response.success) {
            toast.success('')
        }
    }

    const handleFetchOrder = async () => {
        fetchOrder()
    }
    const handleEditReq = async () => {
        setLoading(true)
        try {
            const request = await api.get('/production/orders?add=editReq', {

            })
            const response = request.data
            console.log('result', response);
            if (response.success) {
                const sortedOrders = response.orders.sort((a: Order, b: Order) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
                setAvailableOrders(sortedOrders);
                setLoading(false)
            }
        } catch (error) {
            console.log('error while fetching data', error)
        }
    }

    const handleNewReq = async () => {
        setLoading(true)
        try {
            const request = await api.get('/production/orders?add=newReq', {

            })
            const response = request.data
            console.log('result', response);
            if (response.success) {
                const sortedOrders = response.orders.sort((a: Order, b: Order) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
                setAvailableOrders(sortedOrders);
                setLoading(false)
            }
        } catch (error) {
            console.log('error while fetching data', error)
        }
    }

    const handlePending = async () => {
        setLoading(true)
        try {
            const request = await api.get('/production/orders?add=pending', {

            })
            const response = request.data
            console.log('result', response);
            if (response.success) {
                const sortedOrders = response.orders.sort((a: Order, b: Order) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
                setAvailableOrders(sortedOrders);
                setLoading(false)
            }
        } catch (error) {
            console.log('error while fetching data', error)
        }
    }

    // const handleCompleted = async () => {
    //     setLoading(true)
    //     try {
    //         const request = await api.get('/production/orders?add=completed', {

    //         })
    //         const response = request.data
    //         console.log('result', response);
    //         if (response.success) {
    //             const sortedOrders = response.orders.sort((a: Order, b: Order) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
    //             setAvailableOrders(sortedOrders);
    //             setLoading(false)
    //         }
    //     } catch (error) {
    //         console.log('error while fetching data', error)
    //     }
    // }
    return (

        <div className='bg-white rounded-md shadow-md w-full sm:w-8/12 md:w-9/12 lg:w-9/12 xl:w-9/12 pb-5'>
            <div className='p-3'>


                <div className='p-5 text-center underline'>
                    <h1 className='text-2xl'>Orders</h1>
                </div>
                <div className='pl-3 space-x-2 p-2' >
                    {/* <button onClick={handleFetchOrder} className='bg-pink-700 p-2 rounded-sm hover:bg-pink-900 text-white px-4'>All</button>
                    <button onClick={handleEditReq} className='bg-pink-700 p-2 rounded-sm hover:bg-pink-900 text-white'>Edit requests</button>
                    <button onClick={handleNewReq} className='bg-pink-600 p-2 rounded-sm hover:bg-pink-800 text-white'>New Requests</button>
                    <button onClick={handleCompleted} className='bg-pink-500 p-2 rounded-sm hover:bg-pink-700 text-white'>Completed</button>
                    <button onClick={handlePending} className='bg-pink-400 p-2 rounded-sm hover:bg-pink-600 text-white'>Pending</button> */}

                    <button onClick={() => { setFilter('All'); setCurrentPage(1); }} className='bg-pink-700 p-2 rounded-sm hover:bg-pink-900 text-white px-4'>All</button>
                    <button onClick={() => { setFilter('Edit_request'); setCurrentPage(1); }} className='bg-pink-700 p-2 rounded-sm hover:bg-pink-900 text-white'>Edit requests</button>
                    <button onClick={() => { setFilter('New_Requests'); setCurrentPage(1); }} className='bg-pink-600 p-2 rounded-sm hover:bg-pink-800 text-white'>New Requests</button>
                    <button onClick={() => { setFilter('Completed'); setCurrentPage(1); }} className='bg-pink-500 p-2 rounded-sm hover:bg-pink-700 text-white'>Completed</button>
                    <button onClick={() => { setFilter('Pending'); setCurrentPage(1); }} className='bg-pink-400 p-2 rounded-sm hover:bg-pink-600 text-white'>Pending</button>


                </div>
                {loading ? (
                    <div className='flex items-center justify-center h-96 '>
                        <ClipLoader color="rgb(10, 10, 10)" size={60} />
                    </div>
                ) : (
                    <>
                        {availableOrders.length > 0 ? (
                            <>
                                <div className='space-y-5 '>
                                    {availableOrders.map((order: Order, index) => {
                                        return (
                                            <div key={index} className='space-y-2 bg-gray-200 rounded-md p-2'>
                                                {order.accepted == 'No' ? (
                                                    <div className='p-2 rounded-md hover:border-black space-x-5 text-center border border-gray-300  bg-white'>
                                                        <h1>Do you want accept the order?</h1>
                                                        <button className='bg-green-700 text-white rounded-full px-3 py-2 hover:bg-black hover:text-white hover:shadow-md' onClick={() => handleAccept(order._id)}>Accept</button>
                                                        <button className='bg-red-600 text-white rounded-full px-3 py-2 hover:bg-black hover:text-white hover:shadow-md' onClick={() => handleReject(order._id)}>Reject</button>
                                                    </div>
                                                ) : null}
                                                <div className=' flex justify-evenly text-xl'>
                                                    <h1>Sales Executive: {order.salesExecId.username}</h1>
                                                    <h1>Retailer : {order.retailerId.retailerName}</h1>
                                                </div>
                                                <div className='flex justify-evenly'>
                                                    {order.accepted == 'Yes' ? (


                                                        <div className=' flex space-x-10 items-center'>
                                                            <h1>{order.status}</h1>
                                                            {order.updateRequest == 'Requested' ? (
                                                                <div className='flex space-x-3 items-center bg-white p-2 rounded-md hover:border-2 border-gray-500'>

                                                                    <h1>Requested for Updating order:</h1>
                                                                    <button className='bg-green-700 text-white rounded-full px-3 py-2 hover:bg-black hover:text-white hover:shadow-md' onClick={() => handlePermitEdit(order._id, 'task')}>Grand</button>
                                                                    <button className='bg-red-600 text-white rounded-full px-3 py-2 hover:bg-black hover:text-white hover:shadow-md'>Deny</button>
                                                                </div>
                                                            ) : null}



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

                                <div className='text-center justify-center flex space-x-5 pt-5'>
                                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='border rounded-full p-2 shadow-sm'>Prev</button>
                                    <p className='pt-2'>{currentPage}</p>
                                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='border rounded-full p-2 shadow-sm'>Next</button>
                                </div>
                            </>
                        ) : (
                            <div className='text-center'>
                                <h1 className='text-red-600'>No orders available</h1>
                            </div>
                        )}
                    </>
                )}


            </div>
        </div>

    )
}

export default Order
import { useState, useEffect } from 'react';
import api from '../../axios/api';
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

interface Order {
    _id: string;
    item: string;
    quantity: string;
    scheduledDate: Date;
    status: string;
    accepted: boolean;
    description: string;
    productionId: {
        productionName: string;

    };
    salesExecId: {
        _id: string
        username: string;

    };

}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchOrder(currentPage);
    }, [currentPage]);

    const fetchOrder = async (page: number = 1) => {
        setLoading(true);
        const token = localStorage.getItem('retailer_token');
        if (token) {
            try {
                const response = await api.get(`/retailer/getOrder?page=${page}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages)
                    // console.log(response.data.orders)
                    setLoading(false);
                }
            } catch (error) {
                console.log('error at fetch order', error);
                setLoading(false);
                toast.error('Error fetching data, Please refresh again');
            }
        }
    };

    return (
        <div className='bg-white rounded-md text-center shadow-md  p-5'>
            <p className='p-5'>Orders</p>
            <div className='px-4'>
                <div className=' flex flex-col  '>
                    {loading ? (
                        <div>
                            <ClipLoader color="rgb(10, 10, 10)" size={60} />
                        </div>
                    ) : (
                        <>
                            <div className='space-y-5'>
                                {orders.map((order) => (

                                    <div key={order._id} className='flex flex-col bg-gradient-to-r from-stone-100 to-stone-50 p-5 rounded-md '>
                                        <div className='flex justify-evenly'>
                                            <h1>Production name: {order.productionId?.productionName}</h1>
                                            <h1>Sales exec: {order.salesExecId?.username}</h1>
                                        </div>
                                        <div className='flex justify-evenly'>
                                            <h1>Item: {order.item}</h1>
                                            <h1>Quantity: {order.quantity}</h1>
                                            <h1>Delivery: {new Date(order.scheduledDate).toLocaleDateString()}</h1>
                                            <h1>Status: {order.status}</h1>
                                            <h1>Payment: {order.accepted}</h1>
                                        </div>
                                        {/* <div className='flex justify-evenly px-3 p-3'>
                                            <div className='bg-slate-50 rounded-md p-2 '>
                                                <p>Description: {order.description}</p>
                                            </div>

                                        </div> */}
                                    </div>
                                ))}
                            </div>
                            <div className='text-center justify-center flex space-x-5 pt-5'>
                                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                                    className="border rounded-full p-2 shadow-sm disabled:bg-white disabled:text-gray-500 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white"
                                >Prev</button>
                                <p className='pt-2'>{currentPage}</p>
                                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
                                    className="border rounded-full p-2 shadow-sm disabled:bg-white disabled:text-gray-500 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white"
                                >Next</button>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

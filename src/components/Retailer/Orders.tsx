import React, { useState, useEffect } from 'react';
import api from '../../axios/api';
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

interface Order {
    _id: string;
    item:string;
    quantity:string;
    scheduledDate:Date;
    status:string;
    accepted: boolean;
    description:string;
    productionId: {
        productionName: string;
      
    };
    salesExecId: {
        username: string;
      
    };
   
}

export default function Orders() {
    const [orders, setOrders] = useState <Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        setLoading(true);
        const token = localStorage.getItem('retailer_token');
        if (token) {
            const decodedToken = decodeJWT(token);
            const decodedId = decodedToken.id;
            try {
                const response = await api.get(`/retailer/getOrder?id=${decodedId}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                    setLoading(false);
                }
            } catch (error) {
                console.log('error at fetch order', error);
                setLoading(false);
                toast.error('Error fetching data, Please refresh again');
            }
        }
    };

    function decodeJWT(token:string) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }
        const base64Url = parts[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const payload = JSON.parse(window.atob(base64));
        return payload;
    }

    return (
        <div className='bg-white rounded-md text-center shadow-md w-9/12 p-5'>
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
                                {orders.map((order, index) => (

                                    <div key={order._id} className='flex flex-col bg-gradient-to-r from-stone-100 to-stone-50 p-5 rounded-md '>
                                        <div className='flex justify-evenly'>
                                            <h1>Production name: {order.productionId.productionName}</h1>
                                            <h1>Sales exec: {order.salesExecId.username}</h1>
                                        </div>
                                        <div className='flex justify-evenly'>
                                            <h1>Item: {order.item}</h1>
                                            <h1>Quantity: {order.quantity}</h1>
                                            <h1>Delivery: {new Date(order.scheduledDate).toLocaleDateString()}</h1>
                                            <h1>Status: {order.status}</h1>
                                            <h1>Payment: {order.accepted}</h1>
                                        </div>
                                        <div className='flex justify-evenly px-3 p-3'>
                                            <div className='bg-slate-50 rounded-md p-2 '>
                                                <p>Description: {order.description}</p>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

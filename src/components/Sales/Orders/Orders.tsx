import React, { useEffect, useState } from 'react';
import api from '../../../axios/api';

interface Order {
  production: string;
  salesExec: string; 
  retailerId: string; 
  scheduledDate: Date;
  imageURL: string[];
  quantity: number;
  status: string;
  blocked: boolean;
  accepted: boolean;
  description: string;
 }
 

function ExistingOrders() {
 const [orders, setOrders] = useState([]);

 useEffect(() => {
    fetchOrders();
 }, []);

 const fetchOrders = async () => {
    const response = await api.get('/sales/orders');
    const result = response.data;
    if (result.success === true) {
      setOrders(result.orders); // Assuming result.orders contains the array of orders
    }
 };

 return (
    <div className='bg-white rounded-md shadow-md '>
      {orders.length > 0 ? (
        <div className='p-2 text-center'>
          <h1 className='font-bold'>Orders</h1>
          {orders.map((order, index) => (
            <div key={index} className='bg-gray-200 rounded-md p-3 space-y-5'>
              <div className='text-center'>
                <h1 className='font-semibold'>Production: {order.productionName}</h1>
              </div>
              <div className='flex justify-evenly'>
                <h1>Item: {order.itemName}</h1>
                <h1>Delivery: {new Date(order.scheduledDate).toLocaleDateString()}</h1>
                <h1>Status: {order.status}</h1>
                <h1>Accepted: {order.accepted.toString()}</h1>
              </div>
              <div className='px-5'>
                <h1>Description:</h1>
                <p>{order.description}</p>
              </div>
              <div className='px-5'>
                <h1>Images:</h1>
                <div className='flex space-x-3'>
                 {order.imageURL.map((url, idx) => (
                    <img key={idx} src={url} alt="" className='w-32 h-32' />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Sorry, your order is empty</h1>
        </div>
      )}
    </div>
 );
}

export default ExistingOrders;

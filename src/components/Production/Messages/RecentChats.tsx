import React, { useState, useEffect } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';

export default function RecentChats({ conversation, id, onUserSelect }) {

  const [user, setUser] = useState()


  useEffect(() => {
    const salesId = conversation.members.find((m: string) => m !== id);
    console.log('sales id ', salesId);
    const getSales = async () => {
      try {
        const response = await api.post(`/production/sales-prof`, { salesId });
        if (response.data.success) {
          console.log('sales exec', response.data.salesExecutive);
          setUser(response.data.salesExecutive)
        }
      } catch (error) {
        console.log('error while fetching conversations', error)
        toast.error('Please try again')
      }
    };

    getSales();
  }, []);

  const handleonclick = (user) => {
    console.log('user details on click', user);
    onUserSelect(user);
  }


  return (
    <div>
      <div className='bg-slate-200 pl-7 text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out' onClick={() => { handleonclick(user) }} >
        <h1>{user?.username}</h1>
      </div>
    </div>
  )
}

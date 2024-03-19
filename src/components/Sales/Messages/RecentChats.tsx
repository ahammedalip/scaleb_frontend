import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../../../axios/api';

export default function RecentChats({ conversation, id, onUserSelect }) {

const [user, setUser] = useState()

useEffect(()=>{
    const prodId = conversation.members.find((m: string) => m !== id);
    console.log('production id for recent chat ', prodId);
    const getSales = async () => {
      try {
        const response = await api.post(`/sales/prod-profile`, { prodId });
        if (response.data.success) {
          console.log('sales exec', response.data.profile);
          setUser(response.data.profile)
        }
      } catch (error) {
        console.log('error while fetching conversations', error)
        toast.error('Please try again')
      }
    };

    getSales();
},[])

const handleonclick = (user)=> {
  console.log('user details on click in recent chats, ', user)
  onUserSelect(user)
}

  return (
    <div>
      <div className='bg-slate-200 pl-7 text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out' onClick={() => { handleonclick(user) }} >
        <h1>{user?.productionName}</h1>
      </div>
    </div>
  )
}

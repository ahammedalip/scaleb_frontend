import React, { useState, useEffect, useRef } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';
import {socket} from '../../../socket/socket'

export default function RecentChats({ conversation, id, onUserSelect }) {

  const [user, setUser] = useState()
  const socketRef = useRef(socket)


  useEffect(() => {
    const salesId = conversation.members.find((m: string) => m !== id);
    // console.log('sales id ', salesId);
    const getSales = async () => {
      try {
        const response = await api.post(`/production/sales-prof`, { salesId });
        if (response.data.success) {
          // console.log('sales exec', response.data.salesExecutive);
          setUser(response.data.salesExecutive)
        }
      } catch (error) {
        console.log('error while fetching conversations', error)
        toast.error('Please try again')
      }
    };

    getSales();
  }, []);

      // to take event from server we can use socket.on 
      useEffect(() => {
     
  
        // Emit the 'addUser' event with the userId
        socketRef.current.emit('addUser', id);
        
        // socketRef.current.on('getUsers', (users)=>{
        //     console.log('users are ===>',users)
        // })
  
        return () => {
            socketRef.current.off('getUsers');
        };
  
    }, [id])

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

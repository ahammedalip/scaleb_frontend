import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../../../axios/api';
import { socket } from '../../../socket/socket'

interface User {
  productionName: string
}

interface Conversation {
  userId: string
}

export default function RecentChats({ conversation, id, onUserSelect }) {

  const [user, setUser] = useState<User>()
  const socketRef = useRef(socket);

  const [usersList, setUsersList] = useState([])
  const [online, setOnline] = useState(false)
  const [prodId, setProdId] = useState('')

  useEffect(() => {
    socketRef.current.on('onlineUsers', data => {
      console.log('users are', data);
      setUsersList(data);

      // Check if prodId is in the usersList and set online state
      const isOnline = data.some((user: {
        userId: string
      }) => user.userId === prodId);
      setOnline(isOnline);
    });
  }, [usersList, prodId]); // Add prodId to the dependency array


  useEffect(() => {
    const prodId = conversation.members.find((m: string) => m !== id);
    setProdId(prodId)
    // console.log('production id for recent chat ', prodId);
    const getSales = async () => {
      try {
        const response = await api.post(`/sales/prod-profile`, { prodId });
        if (response.data.success) {
          // console.log('sales exec', response.data.profile);
          setUser(response.data.profile)
        }
      } catch (error) {
        console.log('error while fetching conversations', error)
        toast.error('Please try again')
      }
    };

    getSales();
  }, [])


  // to take event from server we can use socket.on 
  useEffect(() => {
    // Listen for incoming messages
    // Emit the 'addUser' event with the userId
    socketRef.current.emit('addUser', id);

    return () => {
      socketRef.current.off('getUsers');
    };

  }, [id])


  const handleonclick = (user: User) => {
    onUserSelect(user)

  }

  return (
    <div>
      <div className='bg-slate-200 pl-7 flex justify-between items-center text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out'
        onClick={() => { if (user) handleonclick(user) }} >
        <div className='w-[80%]'>
          <h1>{user?.productionName}</h1>

        </div>
        <div className=' flex justify-center w-[20%]'>
          {online && <p className='h-3 w-3 shadow-lg  rounded-full  bg-green-400'></p>}
        </div>
      </div>
    </div>
  )
}

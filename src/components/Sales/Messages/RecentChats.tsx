import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../../../axios/api';
import { socket } from '../../../socket/socket'

export default function RecentChats({ conversation, id, onUserSelect }) {

  const [user, setUser] = useState()
  const socketRef = useRef(socket);
  const [unRead, setUnRead] = useState(0)
  const [count, setCount] = useState(0)

  // useEffect(()=>{
  //   socketRef.current.on('getMessage',data=>{
  //       setUnRead(unRead+1)
  //   })
  // },[])

  // useEffect(()=>{
  // setCount(unRead)
  // },[unRead])
  useEffect(() => {
    const prodId = conversation.members.find((m: string) => m !== id);
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

    // socketRef.current.on('getUsers', (users)=>{
    //     console.log('users are ===>',users)
    // })

    return () => {
      socketRef.current.off('getUsers');
    };

  }, [id])


  const handleonclick = (user) => {
    // console.log('user details on click in recent chats, ', user)
    onUserSelect(user)
    // setCount(0)
    // setUnRead(0)
  }

  return (
    <div>
      <div className='bg-slate-200 pl-7 flex text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out' onClick={() => { handleonclick(user) }} >
        <h1>{user?.productionName}</h1>
        <div className='items-end'>
          <p className='bg-green-500 rounded-full px-1'>{count !== 0 ? count : null}</p>
        </div>

      </div>
    </div>
  )
}

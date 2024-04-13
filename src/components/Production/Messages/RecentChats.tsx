import { useState, useEffect, useRef } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';
import { socket } from '../../../socket/socket'



interface User {
  username: string
}
interface Conversation {
  members: string[];
  // Add other properties if conversation has more fields
}

interface Props {
  conversation: Conversation;
  id: string;
  onUserSelect: (user: User) => void;
}

export default function RecentChats({ conversation, id, onUserSelect }: Props) {

  const [user, setUser] = useState<User>()
  const [salesId, setSalesId] = useState('')
  const [usersList, setUsersList] = useState([])
  const [online, setOnline] = useState(false)
  const socketRef = useRef(socket)


  useEffect(() => {
    const salesId = conversation.members.find((m: string) => m !== id);
    // console.log('sales id ', salesId);
    setSalesId(salesId!)
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


  useEffect(() => {
    socketRef.current.on('onlineUsers', data => {
      console.log('users are', data)
      setUsersList(data)

      const isOnline = data.some((user: {
        userId: string
      }) => user.userId == salesId)
      setOnline(isOnline)
    })
  }, [usersList, salesId])


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

  const handleonclick = (user: User) => {
    onUserSelect(user);
  }


  return (
    <div>
      <div className='bg-slate-200 flex justify-between items-center pl-7 text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out' onClick={() => { if (user) handleonclick(user) }} >
        <div className='w-[80%]'>
          <h1>{user?.username}</h1>
        </div>
        <div className=' flex justify-center w-[20%]'>
          {online && <p className='h-3 w-3 rounded-full bg-green-400'></p>}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import api from '../../../axios/api'
import ClipLoader from "react-spinners/ClipLoader";
import RecentChats from './RecentChats';
import toast from 'react-hot-toast';
import { socket } from '../../../socket/socket';


function ChatList({ onUserSelect }: { onUserSelect: any }) {
  const [productionList, setProductionList] = useState<{ _id: string; productionName: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const [id, setId] = useState('')
  const socketRef = useRef(socket);
  const [usersList, setUsersList] = useState([])


  useEffect(() => {
    fetchProduction()
    fetchRecentConversations()
  }, [])

  useEffect(() => {
    socketRef.current.on('onlineUsers', data => {
      console.log('users are', data)
      setUsersList(data)
    })
  }, [usersList])

  const fetchProduction = async () => {
    try {
      setLoading(true)
      const request = await api.get('/sales/available-prod')
      const response = request.data
      // console.log('fetch production', response);
      if (response.success) {
        setProductionList(response.availableProduction)
      }
    } catch (error) {
      console.error('Error fetching Production:', error);
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentConversations = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('retailerSales_token');
      if (token) {
        const decoded = decodeJWT(token);
        setId(decoded.id)
        const response = await api.get(`/conversation/${decoded.id}`)
        if (response.data.success == true) {
          setConversations(response.data.conversation)
          // console.log('vindfefiei-------', response.data.conversation)
          setLoading(false)
        }
      }
    } catch (error) {
      console.error('Error fetching sales executives:', error);
    } finally {
      setLoading(false)
    }
  }

  function decodeJWT(token: string) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    // Decode the Base64 string to a JSON object
    const payload = JSON.parse(window.atob(base64));
    return payload;
  }

  const createConversation = async (productionId: string, productionName: string) => {
    const ids = {
      senderId: id,
      recipientId: productionId
    }

    try {
      const response = await api.post('/conversation/', ids)
      if (response.data.existing) {
        toast.error('Conversation already exists')
      }
      if (response.data.success) {
        console.log(response.data)
        fetchRecentConversations()
      }

      const user = {
        _id: productionId,
        username: productionName
      }
      onUserSelect(user)
    } catch (error) {
      console.log('error at creating conversations', error)
      toast.error('Please refresh and try again')
    }
  }

  return (

    <div className='p-2 bg-gray-00 w-5/12 ' >

      <div className='text-center text-lg border-b-2 border-gray-400' >
        <h1>Chat List</h1>
      </div>
      {loading ? (
        <div className='flex items-center justify-center h-96 '>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (

        <div className='space-y-2 pt-2'>

          <h1>Recent Chats</h1>
          {conversations.map((conv, index) => (

            <RecentChats key={index} conversation={conv} id={id} onUserSelect={onUserSelect} />
          ))}

          <h1>Available Chats</h1>
          {productionList.filter(production => {
            return !conversations.some((conv:any) => conv.members.includes(production._id))
          }).map((production: {
            productionName: string;
            _id: string;
          }, index) => {
            return (
              <div key={index} className='bg-slate-200 pl-7 text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out' onClick={() => createConversation(production._id, production.productionName)}>
                <h1>{production.productionName}</h1>

              </div>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default ChatList
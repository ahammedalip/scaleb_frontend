import { useEffect, useState } from 'react';
import api from '../../../axios/api';
import ClipLoader from "react-spinners/ClipLoader";
import RecentChats from './RecentChats';
import toast from 'react-hot-toast';



function ChatList({ onUserSelect }: { onUserSelect: any }) {
  const [conversations, setConversations] = useState([])
  const [salesList, setSalesList] = useState<{ _id: string; username: string }[]>([]);
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')

  useEffect(() => {
    fetchSales();
    fetchRecentConversations()
  }, []);


  const fetchRecentConversations = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('production_token');
      if (token) {
        const decoded = decodeJWT(token);
        setId(decoded.id)
        const response = await api.get(`/conversation/${decoded.id}`)
        if (response.data.success == true) {
          console.log('conversations', response.data.conversation)
          setConversations(response.data.conversation)
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

  const fetchSales = async () => {
    try {
      setLoading(true)
      const response = await api.get('/production/available-sales');
      console.log('fetch production', response);
      if (response.data.success) {

        setSalesList(response.data.salesExecutive);
      }
    } catch (error) {
      console.error('Error fetching sales executives:', error);
    } finally {
      setLoading(false)
    }
  };

  const createConversation = async (salesId: string, username: string) => {
    const ids = {
      senderId: id,
      recipientId: salesId
    }
    try {
      const response = await api.post('/conversation/', ids)
      if (response.data.existing) {
        toast.error('Conversation already exists!')
      }
      if (response.data.success) {
        console.log(response.data)
        fetchRecentConversations()
      }
      const user = {
        _id: salesId,
        username: username
      }
      onUserSelect(user)
    } catch (error) {
      console.log('error at creating conversations', error)
      toast.error('Please refresh and try again')

    }
  }

  return (
    <div className='sm:p-2 bg-gray-00 w-5/12 '>
      <div className='text-center text-lg border-b-2 border-gray-400'>
        <h1>Chat List</h1>
      </div>
      {loading ? (
        <div className='flex items-center justify-center h-96 '>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (


        <div className='space-y-2 pt-2 overflow-y-scroll'>
          <h1>Recent Chats</h1>
          {conversations.map((conv, index) => (

            <RecentChats key={index} conversation={conv} id={id} onUserSelect={onUserSelect} />
          ))}


          <h1>Available Chats</h1>
          {salesList.filter((sales) => {
            return !conversations.some((conv: any) => conv.members.includes(sales._id));
          }).map((sales:
            {
              username: string;
              _id: string
            }, index) => (
            <div key={index} className='bg-slate-200 sm:pl-7 text-lg rounded-full p-2 hover:bg-white hover:cursor-pointer duration-150 ease-in-out' onClick={() => createConversation(sales._id, sales.username)}>
              <h1>{sales.username}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatList;

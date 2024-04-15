import { useState, useEffect, useRef } from 'react'
import Header from '../../../components/header/Header'
import Chat from '../../../components/Production/Messages/Chat'
import ChatList from '../../../components/Production/Messages/ChatList'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import api from '../../../axios/api'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../../socket/socket'
import toast from 'react-hot-toast'


interface JwtPayload {
  id: string
}

interface User {
  _id: string,
  username: string
}

function Messages() {

  // const [conversation, setConversation] = useState([]);

  const [selectedUser, setSelectedUser] = useState({
    _id: '',
    username: ''
  });
  const [premium, setPremium] = useState(true)

  const socketRef = useRef(socket);

  useEffect(() => {
    fetchSubscription()
  }, [])

  useEffect(() => {
    socketRef.current.on('getMessage', () => {

      toast('You have a message')
    })
  }, [])

  const navigate = useNavigate()

  const fetchSubscription = async () => {
    const token = localStorage.getItem('production_token')
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token)
      const id = decodedToken.id
      try {
        const response = await api.get(`/production/profile?id=${id}`)
        if (response.data.success) {
          // console.log('hksjkahdkfkjakjdsf', response.data.userDetails)
          const subscribed = response.data.userDetails.subscribed

          // console.log('sub here------', subscribed)
          if (subscribed.active == true) {
            setPremium(true)
          }
          else if (subscribed.active == false || subscribed == undefined) {
            setPremium(false)
            navigate('/production/subscription')
          }
        }
      } catch (error) {
        console.log('error while fetching subscription', error)
        toast.error('please refresh again')
      }
    }
  }



  const handleUserSelect = (user: User) => {

    setSelectedUser(user)
    console.log('selected user form messges page', selectedUser)

  }




  return (
    <div>

      <Header />
      <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  pt-20 space-x-5'>
        <div className=''>

          <ProductionMenu />
        </div>
        {premium == false ? (

          <div className='flex items-center justify-center h-60 bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400'>
            <h1 className='text-white text-center font-normal text-5xl'>This is a premium feature, Please subscribe to get this feature</h1>
          </div>
        ) : (

          <div className='flex bg-white rounded-lg shadow-lg p-2 sm:p-5 sm:w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400 h-screen'>
            
            <Chat selectedUser={selectedUser} />
            <ChatList onUserSelect={handleUserSelect} />
          </div>
        )}

      </div>
    </div>
  )
}

export default Messages


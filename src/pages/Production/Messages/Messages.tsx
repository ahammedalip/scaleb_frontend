import React, { useState, useEffect, useRef } from 'react'
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

function Messages() {

  // const [conversation, setConversation] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [premium, setPremium] = useState(true)

  const socketRef = useRef(socket);

  useEffect(() => {
    fetchSubscription()
  }, [])

  useEffect(() => {
    socketRef.current.on('getMessage', (data: {
        senderId: string,
        text: string,
    }) => {
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

      }
    }

  }



  const handleUserSelect = (user: object) => {

    setSelectedUser(user)
    console.log('selected user form messges page', selectedUser)

  }




  return (
    <div>

      <Header />
      <div className='bg-red-50/40 max-h-screen min-h-screen pt-20 flex space-x-5 pb-5'>
        <ProductionMenu />

        <div className='flex bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400'>
          <Chat selectedUser={selectedUser} />
          <ChatList onUserSelect={handleUserSelect} />
        </div>

      </div>
    </div>
  )
}

export default Messages


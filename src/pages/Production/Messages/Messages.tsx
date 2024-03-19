import React, { useState } from 'react'
import Header from '../../../components/header/Header'
import Chat from '../../../components/Production/Messages/Chat'
import ChatList from '../../../components/Production/Messages/ChatList'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'

function Messages() {
  // const [conversation, setConversation] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});


  const handleUserSelect =(user:object) =>{
    
    setSelectedUser(user)
    console.log('selected user form messges page',selectedUser)
   
  }



 
  return (
    <div>

      <Header />
      <div className='bg-red-50/40 max-h-screen min-h-screen pt-20 flex space-x-5 pb-5'>
        <ProductionMenu />

        <div className='flex bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400'>    
                <Chat  selectedUser = {selectedUser} />
                <ChatList onUserSelect={handleUserSelect} />          
            </div>

      </div>
    </div>
  )
}

export default Messages


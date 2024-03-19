import React, { useState } from 'react'
import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import Chat from '../../components/Sales/Messages/Chat'
import ChatList from '../../components/Sales/Messages/ChatList'

function Messages() {

    const [selectedUser, setSelectedUser] = useState({});


    const handleUserSelect =(user:object) =>{
      
      setSelectedUser(user)
      console.log('selected user form messges page',selectedUser)
     
    }

    return (
        <div>
            <Header />
            <div className='bg-red-50/40 pt-20 max-h-screen min-h-screen flex space-x-4 pb-5'>
                <div className=''>
                    <SalesMenu />
                </div>
                <div className='flex bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400'>
                
                <Chat  selectedUser = {selectedUser}/>
                <ChatList onUserSelect ={handleUserSelect}/>               
                </div>


            </div>
        </div>
    )
}

export default Messages
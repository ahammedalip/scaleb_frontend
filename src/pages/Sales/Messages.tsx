import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import Chat from '../../components/Sales/Messages/Chat'
import ChatList from '../../components/Sales/Messages/ChatList'
import { jwtDecode } from 'jwt-decode'
import api from '../../axios/api'
import { useNavigate } from 'react-router-dom'



interface JwtPayload {
    id: string;
}


function Messages() {

    const [selectedUser, setSelectedUser] = useState({});
    const [premium, setPremium] = useState(true)


    useEffect(() => {
        fetchUser()
    }, [])

    const navigate = useNavigate()
    const fetchUser = async () => {
        const token = localStorage.getItem('retailerSales_token')
        if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token)
            const id = decodedToken.id
            try {
                const response = await api.get(`/sales/checkSubscription?id=${id}`)
                if (response.data.success) {
                    console.log('data is ======== ', response.data.admin)
                    if (response.data.admin.active) {
                        setPremium(true)

                    } else if (response.data.admin.active == undefined) {
                        console.log('coming to undefined')
                        setPremium(false)
                    }
                }


            } catch (error) {

            }
        }
    }
    const handleUserSelect = (user: object) => {
        setSelectedUser(user)
    }

    return (
        <div>
            <Header />

            <div className='bg-red-50/40 pt-20 max-h-screen min-h-screen flex space-x-4 pb-5'>

            
                    <div className=''>
                        <SalesMenu />
                    </div>
                    {premium == false ? (

                        <div className='flex items-center justify-center h-60 bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400'>
                            <h1 className='text-white text-center font-normal text-5xl'>This is a premium feature, Please subscribe to get this feature</h1>
                        </div>

                    ) : (
                        <div className='flex bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400'>

                            <Chat selectedUser={selectedUser} />
                            <ChatList onUserSelect={handleUserSelect} />
                        </div>
                

                )}


            </div>
        </div>
    )
}

export default Messages
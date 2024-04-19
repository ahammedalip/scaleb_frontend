import { useEffect, useRef, useState } from 'react'
import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import Chat from '../../components/Sales/Messages/Chat'
import ChatList from '../../components/Sales/Messages/ChatList'
import { jwtDecode } from 'jwt-decode'
import api from '../../axios/api'
// import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { socket } from '../../socket/socket'



interface JwtPayload {
    id: string;
}
interface User {
    _id: string,
    productionName: string
  }

function Messages() {

    const [selectedUser, setSelectedUser] = useState({
        _id: '',
        productionName: ''
    });
    const [premium, setPremium] = useState(true)
    const socketRef = useRef(socket);


    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        socketRef.current.on('getMessage', () => {
            toast('You have a message')
        })
    }, [])

    // const navigate = useNavigate()
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
                    }else if(response.data.admin.active == false){
                        setPremium(false)
                        
                    }
                    
                }
            } catch (error) {
                console.log('error while checking subscribed')
            }
        }
    }
    const handleUserSelect = (user: User) => {
        setSelectedUser(user)
    }

    return (
        <div>
            <Header />
            <div className='flex flex-col-reverse sm:flex-row justify-start  bg-red-50/40 min-h-screen  sm:pt-20 space-x-5'>
                <div className=''>
                    <SalesMenu />
                </div>
                {premium == false ? (

                    <div className='flex items-center justify-center bg-white rounded-lg shadow-lg p-5 w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400  h-[600px]'>
                        <h1 className='text-white text-center font-normal text-5xl'>This is a premium feature, Please subscribe to get this feature</h1>
                    </div>
                ) : (
                    <div className='flex bg-white rounded-lg shadow-lg p-2 sm:p-5 sm:w-9/12 bg-gradient-to-r from-zinc-200 to-gray-400 h-[600px]'>

                        <Chat selectedUser={selectedUser} />
                        <ChatList onUserSelect={handleUserSelect} />
                    </div>
                )}


            </div>

        </div>
    )
}

export default Messages
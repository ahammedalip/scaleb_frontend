import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import api from '../../../axios/api';
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from 'react-spinners/BeatLoader'
import toast from 'react-hot-toast';
import moment from 'moment';
import { socket } from '../../../socket/socket';
import { BsFillImageFill } from "react-icons/bs";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../firebase/firebaseConfig'


interface ChatProps {
    selectedUser: {
        userId: string;
        userName: string;

    };
}

interface Message {
    sender: string;
    text: string;
    createdAt: Date;
    imageUrl?: string;
}

function Chat({ selectedUser }) {
    const [userId, setUserId] = useState('')
    const [conversationId, setConversationId] = useState('')
    const [conversations, setConversations] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [arrivalMessage, setArrivalMessage] = useState<Message>()
    const [messages, setMessages] = useState<Message[]>([])
    const socketRef = useRef(socket);
    const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for the messages end
    const [imageAsFile, setImageAsFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false)

    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchRecentConversations();
        getMessage()

    }, [selectedUser]);

    useEffect(() => {
        
        socketRef.current.on('getMessage', data => {
          console.log('the socket message is coming here,,,')

            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                imageUrl:data.imageUrl,
                createdAt: data.createdAt
            })       
        })
    }, [])

    useEffect(() => {

        if (arrivalMessage) {
            setMessages([...messages, arrivalMessage])
        }
    }, [arrivalMessage])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom when new messages are added
    }, [messages]);

    useEffect(() => {
    if (imageUrl) {
        sendImgUrlMessage();
    }
}, [imageUrl]); // This useEffect will run whenever imageUrl changes


    const fetchRecentConversations = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('retailerSales_token');
            if (token) {
                const decoded = decodeJWT(token);
                const userId = decoded.id
                setUserId(decoded.id)
                const response = await api.get(`/conversation/${userId}`)
                if (response.data.success == true) {
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

    const getMessage = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/messages/?sender=${userId}&recipient=${selectedUser._id}`)

            if (response.data.success) {
                // console.log('data of messages', response.data)
                setMessages(response.data.messages)
                setConversationId(response.data.conversationId)
                setLoading(false)
            }
        } catch (error) {
            console.log('error fetching mesages', error)
        }
    }

    const sendMessage = async () => {
        const trimmedText = text.trim()
        if (trimmedText == '') {
            return
        }
        const message = {
            sender: userId,
            text: trimmedText,
            conversationId: conversationId,
        }

        socketRef.current.emit('sendMessage', {
            senderId: userId,
            receiverId: selectedUser._id,
            text: trimmedText,
        })

        try {
            const response = await api.post('/messages/', message)
            if (response.data.success) {
                setMessages([...messages, response.data.savedMessage])
                setText('');
                setImageUrl('');
            }
        } catch (error) {
            console.log('error while sending message', error)
            toast.error('Error, please send again')
        }

    }

    const uploadImageToFirebase = async (image) => {
        if (image === null) {
            console.error('No image file selected');
            return;
        }

        const storage = getStorage(app);
        const storageRef = ref(storage, `chat/${image.name}`);

        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef)
        setImageUrl(url);
    }

    const sendImgUrlMessage = async () => {
        const message = {
            sender: userId,
            conversationId: conversationId,
            imageUrl: imageUrl
        }

        socketRef.current.emit('sendMessage', {
            senderId: userId,
            receiverId: selectedUser._id,
            imageUrl: imageUrl
        })

        try {
            const response = await api.post('/messages/', message)
            if (response.data.success) {
                setMessages([...messages, response.data.savedMessage])
                setText('');
                setImageUrl('');
            }
        } catch (error) {
            console.log('error while sending message', error)
            toast.error('Error, please send again')
        }
    }

    const handleImageAsFile = async (e) => {
        setImageLoading(true)
        const image = e.target.files[0]
        setImageAsFile(image);
        console.log(imageAsFile)
        uploadImageToFirebase(image).then(() => setImageLoading(false))
    };


    return (
        <div className='bg-slate-00 p-2 w-7/12' style={{ borderRight: '4px solid #6F6A69' }}>

            {selectedUser.productionName == undefined ? (
                <div className='bg-white rounded-lg w-full py-4 px-2 space-y-2 flex flex-col' style={{ height: '85%' }}>
                    <div className='flex items-center justify-center h-full'>
                        <h1 className='text-gray-300 text-center font-normal text-5xl'>Please select a chat</h1>
                    </div>
                </div>
            ) : loading ? (
                <div className='flex items-center justify-center h-96 '>
                    <ClipLoader color="rgb(10, 10, 10)" size={60} />
                </div>
            ) : (
                <>
                    <div className='text-center text-lg pb-3' >
                        <div className='w-auto rounded-full bg-white p-2'>
                            <h1 className='font-semibold'>{selectedUser.productionName}</h1>
                        </div>

                    </div>
                    <div className='bg-white rounded-lg w-full py-4 px-2 space-y-2 flex flex-col' style={{ height: '82%', overflowY: 'scroll', backgroundImage: "linear-gradient(135deg, rgba(49, 49, 49,0.07) 0%, rgba(49, 49, 49,0.07) 12.5%,rgba(76, 76, 76,0.07) 12.5%, rgba(76, 76, 76,0.07) 25%,rgba(102, 102, 102,0.07) 25%, rgba(102, 102, 102,0.07) 37.5%,rgba(129, 129, 129,0.07) 37.5%, rgba(129, 129, 129,0.07) 50%,rgba(155, 155, 155,0.07) 50%, rgba(155, 155, 155,0.07) 62.5%,rgba(182, 182, 182,0.07) 62.5%, rgba(182, 182, 182,0.07) 75%,rgba(208, 208, 208,0.07) 75%, rgba(208, 208, 208,0.07) 87.5%,rgba(235, 235, 235,0.07) 87.5%, rgba(235, 235, 235,0.07) 100%),linear-gradient(45deg, rgba(5, 5, 5,0.07) 0%, rgba(5, 5, 5,0.07) 12.5%,rgba(39, 39, 39,0.07) 12.5%, rgba(39, 39, 39,0.07) 25%,rgba(73, 73, 73,0.07) 25%, rgba(73, 73, 73,0.07) 37.5%,rgba(107, 107, 107,0.07) 37.5%, rgba(107, 107, 107,0.07) 50%,rgba(141, 141, 141,0.07) 50%, rgba(141, 141, 141,0.07) 62.5%,rgba(175, 175, 175,0.07) 62.5%, rgba(175, 175, 175,0.07) 75%,rgba(209, 209, 209,0.07) 75%, rgba(209, 209, 209,0.07) 87.5%,rgba(243, 243, 243,0.07) 87.5%, rgba(243, 243, 243,0.07) 100%),linear-gradient(90deg, #ffffff,#ffffff)" }}>
                        {messages.map((message: Message, index: number) => (
                            <div key={index} className={message.sender == userId ? 'flex justify-end' : 'flex justify-start'}>
                                <div>
                                    {message.imageUrl ? (
                                        <img src={message.imageUrl} alt="Chat image" className='w-60 h-60 rounded-2xl border' />
                                    ) : (
                                        <div className={message.sender == userId ? 'border w-fit p-2 rounded-2xl bg-white ' : 'border w-fit p-2 rounded-2xl bg-white '}>
                                            {message.text?.split('\n').map((line, lineIndex) => (
                                                <h1 key={lineIndex}>
                                                    {line}
                                                    <br />
                                                </h1>
                                            ))}
                                        </div>
                                    )}
                                    <p className={message.sender == userId ? "text-xs text-gray-400 text-end pr-4" : 'text-xs text-gray-400 pl-3'}>{moment(message.createdAt).fromNow()}</p>
                                </div>

                            </div>
                        ))}
                        {imageLoading ? (

                            <div className='justify-end flex pr-8'>
                                <BeatLoader color="rgb(10, 10, 10)" size={20} />
                            </div>
                        ) : null}
                        <div ref={messagesEndRef} />

                    </div>
                    <div className='pt-2 flex space-x-3'>
                        <div className='flex-grow'>
                            <label>
                                <textarea
                                    className='border-2 border-blue-500 rounded-full p-3 w-full'
                                    name="myInput"
                                    placeholder='Type something..'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={1}
                                />
                            </label>
                        </div>
                        <div className='flex-shrink-0 pr-2  flex items-center justify-center text-3xl hover:cursor-pointer space-x-3' onClick={sendMessage}>
                            <SendIcon fontSize="large" />
                            <button onClick={() => fileInputRef.current?.click()} className="custom-upload-button">
                                <BsFillImageFill size={24} />
                            </button>
                            <input
                                type="file"
                                accept='image/*,.png,.jpg,.jpeg,.gif'
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageAsFile}
                            />

                        </div>
                    </div>
                </>
            )}


        </div>
    );
}

export default Chat;

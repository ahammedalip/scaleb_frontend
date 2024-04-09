import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import api from '../../../axios/api';
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from 'react-spinners/BeatLoader'
import toast from 'react-hot-toast';
import { socket } from '../../../socket/socket'
import moment from 'moment';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../firebase/firebaseConfig'
import { BsFillImageFill } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from "react-icons/md";


interface Message {
    sender: string;
    text: string;
    createdAt: Date;
    imageUrl?: string;
    videoUrl?: string;
}

interface SelectedUser {
    _id: string;
    username: string;
}

function Chat({ selectedUser }: { selectedUser: SelectedUser }) {
    const [selectedUserDetails, setSelectedUserDetails] = useState<any>({})
    const [userId, setUserId] = useState('')
    const [conversationId, setConversationId] = useState('')
    const [conversations, setConversations] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])
    const [arrivalMessage, setArrivalMessage] = useState<Message>()
    const [recipientId, setRecipientId] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const socketRef = useRef(socket);
    const [imageAsFile, setImageAsFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for the messages end
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {

        fetchRecentConversations()
        getMessage()
        setSelectedUserDetails(selectedUser)

    }, [selectedUser]);

    useEffect(() => {
        socketRef.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                imageUrl: data.imageUrl,
                createdAt: data.createdAt
            })
        })
    }, [])

    useEffect(() => {
        if (arrivalMessage) {
            if (selectedUserDetails._id == arrivalMessage.sender) {
                setMessages([...messages, arrivalMessage])
            }
        }
    }, [arrivalMessage])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom when new messages are added
    }, [messages]);

    useEffect(() => {
        if (imageUrl) {
            sendImgUrlMessage();
        }
    }, [imageUrl]);

    useEffect(() => {
        if (videoUrl) {
            sendVidUrlMessage()
        }
    }, [videoUrl])

    useEffect(() => {
        socketRef.current.on('statusTyping', (data: { senderId: string }) => {
            console.log(selectedUser)
            if (selectedUser._id === data.senderId) {
                console.log('id is same')
                setIsTyping(true)
            }

            setTimeout(() => {
                setIsTyping(false);
            }, 3000);
        })
    }, [selectedUser])

    const fetchRecentConversations = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('production_token');
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

    const getMessage = async () => {
        try {
            if (selectedUser) {
                setRecipientId(selectedUser._id)
            }
            const response = await api.get(`/messages/?sender=${userId}&recipient=${selectedUser._id}`)

            if (response.data.success) {
                console.log('data of messages', response.data)
                setMessages(response.data.messages)
                setConversationId(response.data.conversationId)
            }
        } catch (error) {
            console.log('error fetching mesages', error)
        }
    }

    function decodeJWT(token: string) {

        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }
        const base64Url = parts[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const payload = JSON.parse(window.atob(base64));

        return payload;
    }

    const sendMessage = async () => {
        if (showEmojiPicker == true) {
            setShowEmojiPicker(false)
        }
        const trimmedText = text.trim()
        if (trimmedText == '') {
            return
        }
        const message = {
            sender: userId,
            text: trimmedText,
            conversationId: conversationId
        }
        socketRef.current.emit('sendMessage', {
            senderId: userId,
            receiverId: recipientId,
            text: trimmedText
        })

        try {
            const response = await api.post('/messages/', message)
            if (response.data.success) {
                setMessages((prev) => [...prev, response.data.savedMessage])
                setText('')
            }
        } catch (error) {
            console.log('error while sending message', error)
            toast.error('Error, please send again')
        }

    }

    const uploadImageToFirebase = async (file: File) => {
        if (file === null) {
            console.error('No image file selected');
            return;
        }

        const isVideo = file.type.startsWith('video/');

        const storage = getStorage(app);
        const storageRef = ref(storage, `chat/${file.name}`);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef)
        if (isVideo) {
            setVideoUrl(url);
        } else {
            setImageUrl(url);
        }
    }
    // send image as message
    const sendImgUrlMessage = async () => {
        const message = {
            sender: userId,
            conversationId: conversationId,
            imageUrl: imageUrl,
            videoUrl: videoUrl
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
    // send video as message
    const sendVidUrlMessage = async () => {
        const message = {
            sender: userId,
            conversationId: conversationId,
            videoUrl: videoUrl
        }

        socketRef.current.emit('sendMessage', {
            senderId: userId,
            receiverId: selectedUser._id,
            videoUrl: videoUrl
        })

        try {
            const response = await api.post('/messages/', message)
            if (response.data.success) {
                setMessages([...messages, response.data.savedMessage])
                setText('');
                setVideoUrl('');
            }
        } catch (error) {
            console.log('error while sending message', error)
            toast.error('Error, please send again')
        }
    }

    const handleImageAsFile = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0]
        if (!file) {
            console.error('No image file selected');
            return;
        }

        // const isVideo = file.type.startsWith('video/');


        setImageLoading(true);
        await uploadImageToFirebase(file).then(() => setImageLoading(false))

    };

    const handleTyping = () => {
        socketRef.current.emit('typing', {
            senderId: userId,
            receiverId: selectedUser._id
        })
    }

    // update emoji and text
    const onEmojiClick = (event: any) => {
        setText((currentText) => currentText + event.emoji);
    };

    // Function to toggle the EmojiPicker visibility
    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    return (
        <div className='bg-slate-00 p-2 w-7/12' style={{ borderRight: '4px solid #6F6A69' }}>

            {selectedUser.username == undefined ? (
                <div className='bg-white rounded-lg w-full py-4 px-2 space-y-2 flex flex-col' style={{ height: '85%' }}>
                    <div className='flex items-center justify-center h-full'>
                        <h1 className='text-gray-300 font-normal text-5xl'>Please select a chat</h1>
                    </div>
                </div>
            ) : loading ? (
                <div className='flex items-center justify-center h-96 '>
                    <ClipLoader color="rgb(10, 10, 10)" size={60} />
                </div>
            ) : (
                <>
                    <div className='text-center text-lg pb-3'>
                        <div className='w-auto rounded-full bg-white h-12  py-2 px-2 sm:p-1 md:p-1 flex flex-col space-x-5 sm:flex-row md:flex-row items-center justify-center'>
                            <h1 className='font-semibold'>{selectedUser.username}   {isTyping && <p className='text-xs text-gray-400 font-thin'>Typing...</p>} </h1>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg w-full py-4 px-2 space-y-2 flex flex-col' style={{ height: '82%', overflowY: 'scroll', backgroundImage: "linear-gradient(135deg, rgba(49, 49, 49,0.07) 0%, rgba(49, 49, 49,0.07) 12.5%,rgba(76, 76, 76,0.07) 12.5%, rgba(76, 76, 76,0.07) 25%,rgba(102, 102, 102,0.07) 25%, rgba(102, 102, 102,0.07) 37.5%,rgba(129, 129, 129,0.07) 37.5%, rgba(129, 129, 129,0.07) 50%,rgba(155, 155, 155,0.07) 50%, rgba(155, 155, 155,0.07) 62.5%,rgba(182, 182, 182,0.07) 62.5%, rgba(182, 182, 182,0.07) 75%,rgba(208, 208, 208,0.07) 75%, rgba(208, 208, 208,0.07) 87.5%,rgba(235, 235, 235,0.07) 87.5%, rgba(235, 235, 235,0.07) 100%),linear-gradient(45deg, rgba(5, 5, 5,0.07) 0%, rgba(5, 5, 5,0.07) 12.5%,rgba(39, 39, 39,0.07) 12.5%, rgba(39, 39, 39,0.07) 25%,rgba(73, 73, 73,0.07) 25%, rgba(73, 73, 73,0.07) 37.5%,rgba(107, 107, 107,0.07) 37.5%, rgba(107, 107, 107,0.07) 50%,rgba(141, 141, 141,0.07) 50%, rgba(141, 141, 141,0.07) 62.5%,rgba(175, 175, 175,0.07) 62.5%, rgba(175, 175, 175,0.07) 75%,rgba(209, 209, 209,0.07) 75%, rgba(209, 209, 209,0.07) 87.5%,rgba(243, 243, 243,0.07) 87.5%, rgba(243, 243, 243,0.07) 100%),linear-gradient(90deg, #ffffff,#ffffff)" }}>

                        {showEmojiPicker && (
                            <div className="emoji-picker-moda absolute z-40">
                                <EmojiPicker onEmojiClick={onEmojiClick} height={400} width={400} />
                            </div>
                        )}
                        <div>
                            {messages.map((message: Message, index: number) => (
                                <div key={index} className={message.sender == userId ? 'flex justify-end' : 'flex justify-start'}>
                                    <div>
                                        {message.imageUrl ? (
                                            <img src={message.imageUrl} alt="Chat image" className='w-60 h-60 rounded-2xl border object-cover' />
                                        ) : message.videoUrl ? (
                                            <video controls className='w-60 h-60 rounded-2xl border object-cover'>
                                                <source src={message.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
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
                                    <BeatLoader color="rgb(10, 10, 10)" size={10} />
                                </div>
                            ) : null}
                            <div ref={messagesEndRef} />

                        </div>
                    </div>


                    <div className='pt-2 flex space-x-3'>
                        <div className='flex-shrink-0 pr-2  flex items-center justify-center text-3xl hover:cursor-pointer space-x-3'>
                            <button onClick={toggleEmojiPicker} className="custom-upload-button z-50">
                                <MdOutlineEmojiEmotions size={30} />
                            </button>
                        </div>
                        <button onClick={() => fileInputRef.current?.click()} className="custom-upload-button">
                            <BsFillImageFill size={24} />
                        </button>
                        <input
                            type="file"
                            accept='image/*,.png,.jpg,.jpeg,.gif,.mp4'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageAsFile}
                        />
                        <div className='flex-grow'>
                            <label>
                                <textarea
                                    className='border-2 border-blue-500 rounded-full p-3 w-full'
                                    name="myInput"
                                    placeholder='Type something..'
                                    value={text}
                                    onChange={(e) => {
                                        setText(e.target.value);
                                        handleTyping()
                                    }}
                                    rows={1}
                                />
                            </label>
                        </div>
                        <div className='flex-shrink-0 pr-2 flex items-center justify-center text-3xl hover:cursor-pointer' onClick={sendMessage}>
                            <SendIcon fontSize="large" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Chat;

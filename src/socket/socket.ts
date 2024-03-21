import { io, Socket } from 'socket.io-client'


const socket: Socket = io('http://localhost:3000')


const sendMessage = (message: string) => {
    socket.emit('chat message', message)
}


socket.on('chat message', (msg: string) => {
    console.log('Message received:', msg);
    // Here, you can update your application's state or UI to display the new message
   });


export {sendMessage, socket}  
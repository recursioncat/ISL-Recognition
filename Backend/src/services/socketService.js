import { call } from '@google-cloud/vision/build/src/helpers.js';
import { chatServicesController } from '../controllers/fileServicesController.js';
import { sendMessages } from '../helpers/socketChatHandler.js';

export default (io) => {
    const users = new Map(); // To store user IDs and corresponding socket IDs

    io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        // Handle user joining a room with their unique recipient ID
        socket.on('joinRoom', ({ sender, recipient }) => {
            users.set(sender, socket.id); // Store the user's unique ID with their socket ID
            console.log(`User ${sender} joined with socket ID: ${socket.id}`);
        });

        // Handle sending a new message
        socket.on('sendMessage', sendMessages(io, users)); // Pass io and users map
        socket.on('useService', chatServicesController(io, users));
        
        // Clean up when a user disconnects
        socket.on('disconnect', () => {
            users.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    users.delete(userId); // Remove user from the map when they disconnect
                    console.log(`User ${userId} disconnected`);
                }
            });
        });
        
        //Video calling P2P
        // A call intializes
        socket.on('call', (callData) => {
            const {calleeId, rtcMsg} = callData;

            socket.to(calleeId).emit('newCall',{
                callerId : socket.id,
                rtcMsg : rtcMsg
            });
        });

        //B call recieves
        socket.on('answerCall', (callData) => {
            const {callerId, rtcMsg} = callData;

            socket.to(callerId).emit('callAnswered', {
                calleeId : socket.id,
                rtc : rtcMsg
            });
        });

        socket.on('ICEcandidate', (callData) => {
            const {calleeId, rtcMsg} = callData;
            console.log(`ICECandidate initialized for ${calleeId}`)

            socket.to(calleeId).emit('ICEcandidate', {
                callerId : socket.Id, 
                rtcMsg : rtcMsg
            })
        })

    });
};

import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import { baseUrl } from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const socket = io(baseUrl);

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const userId = "66d5dadfac521b59531f1973";  // Current user ID
    const recipientId = "66d595fbbab7919b300ed843";  // Recipient user ID

    useEffect(() => {
        // Fetch chat history when component mounts
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/chat/messages/${userId}/${recipientId}`);
                setChat(response.data.data.messages);
                // console.log('Fetched messages:', response.data.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Join room for real-time messaging
        socket.emit('joinRoom', { userId, recipientId });
        console.log('Joined room');

        // Listening for new incoming messages
        socket.on('receiveMessage', (message) => {
            console.log('Received message:', message);
            // Append the new message to the chat
            setChat((prevChat) => [...prevChat, message]);
        });

        return () => {
            socket.off('receiveMessage'); // Clean up listener when component unmounts
        };
    }, []);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const messageObject = {
            sender: userId,
            recipient: recipientId,
            content: message,
            timestamp: new Date() // Add the timestamp when the message is sent
        };

        // Send the message via socket
        socket.emit('sendMessage', messageObject);

        // Clear the message input field
        setMessage('');
    };

    // Helper function to format the timestamp into "hh:mm AM/PM"
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const uniqueKey = (item, index) => index.toString();

    return (
        <View className="flex-1 bg-gray-100 p-4">
            {/* Chat history */}
            <FlatList
                data={chat}
                keyExtractor={uniqueKey}
                renderItem={({ item }) => (
                    <View className={`mb-2 p-2 ${
                        item.sender === userId ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
                    } rounded-lg`}>
                        <Text className={`text-lg mt-1 ${
                            item.sender === userId ? 'text-blue-800' : 'text-gray-800'
                        }`}>
                            {item.content}
                        </Text>
                        {/* Display the timestamp at the bottom right */}
                        <Text className="text-xs text-gray-500 text-right">
                            {formatTime(item.timestamp)}
                        </Text>
                    </View>
                )}
            />

            {/* Input for typing a message */}
            <View className="flex-row items-center mt-4">
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                    placeholderTextColor={"gray"}
                    className="flex-1 p-2 bg-white border text-black border-gray-300 rounded-lg"
                />
                <TouchableOpacity onPress={sendMessage} className="ml-2 bg-blue-500 p-2 rounded-full">
                    <MaterialIcons name="send" size={23} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatScreen;

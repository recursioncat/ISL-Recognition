import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { baseUrl } from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Replace this with your ngrok URL or backend server URL
const socket = io(baseUrl);

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const userId = "66d5dadfac521b59531f1973";
  const recipientId = "66d595fbbab7919b300ed843";

  useEffect(() => {
    // Join the room for the current user
    socket.emit('joinRoom', { userId, recipientId });

    // Listen for new messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        senderId: userId,
        recipientId,
        content: message,
      };

      // Emit the message via Socket.IO
      socket.emit('sendMessage', messageData);

      // Optionally add the message to local state immediately
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Chat history */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            className={`mb-2 p-2 ${
              item.senderId === userId ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
            } rounded-lg`}
          >
            <Text className={`text-sm font-medium ${
              item.senderId === userId ? 'text-blue-800' : 'text-gray-800'
            }`}>
              {item.senderId === userId ? 'Me' : 'Them'}
            </Text>
            <Text className={`text-lg mt-1 ${
              item.senderId === userId ? 'text-blue-800' : 'text-gray-800'
            }`}>
              {item.content}
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

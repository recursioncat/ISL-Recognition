import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { baseUrl } from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const socket = io(baseUrl);

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const[chat, setChat] = useState([]);

    const userId = "66d5dadfac521b59531f1973" ;  // Current user ID
    const recipientId = "66d595fbbab7919b300ed843";  // Recipient user ID
  

    useEffect(() => {
      socket.emit('joinRoom', { userId, recipientId });
      console.log('Joined room');
      socket.on('receiveMessage', (message) => {
        console.log('Received message:', message);
        setChat([...chat, message]);
      });

    }, []);

    const sendMessage = async() => {
      if(message.trim() === '') return;

      const messageObject = {
        sender: userId,
        recipent:recipientId,
        content: message,
      };
      socket.emit('sendMessage', messageObject);
      setMessage('');
      setChat([...chat, messageObject]);
      console.log('Sent message:', messageObject);
      console.log('Chat:', chat);
    }

    const uniqueKey = (item) =>{
      const time = new Date().getTime();
      return item.senderId + item.recipientId + time;
    }


  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Chat history */}
      {/* <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
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
      /> */}

      <FlatList key={uniqueKey(chat)} data={chat} renderItem={({item}) => (
        <View className={`mb-2 p-2 ${
          item.sender === userId ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
        } rounded-lg`}>
          <Text className={`text-sm font-medium ${
            item.sender === userId ? 'text-blue-800' : 'text-gray-800'
          }`}>
            {item.sender === userId ? 'Me' : 'Them'}
          </Text>
          <Text className={`text-lg mt-1 ${
            item.sender === userId ? 'text-blue-800' : 'text-gray-800'
          }`}>
            {item.content}
          </Text>
        </View>
      )} />

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
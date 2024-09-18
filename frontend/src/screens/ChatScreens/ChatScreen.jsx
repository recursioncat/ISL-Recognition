import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import { baseUrl } from '../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const socket = io(baseUrl);

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');

  const { sender, recipient } = route.params;

  useEffect(() => {
  
    const fetchUserIds = async () => {
      try {
        const senderResponse = await axios.get(`${baseUrl}/api/v1/auth/getUserId/${sender}`);
        const recipientResponse = await axios.get(`${baseUrl}/api/v1/auth/getUserId/${recipient}`);

        setSenderId(senderResponse.data.data.id);
        setRecipientId(recipientResponse.data.data.id);

        try{

            const messagesResponse = await axios.get(
              `${baseUrl}/api/v1/chat/messages/${senderResponse.data.data.id}/${recipientResponse.data.data.id}`
            );
            console.log(messagesResponse.data.data);
            const data = messagesResponse.data.data;
    
            if (data.messages.length !== 0) {
              setChat(data.messages);
            } else {
              setChat([]);
            }
        }catch(error){
            console.error('Error fetching messages:', error);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setChat([]);
        }
        console.error('Error fetching user IDs:', error);
      }
    };

    fetchUserIds();

    if (senderId && recipientId) {
      socket.emit('joinRoom', { sender: senderId, recipient: recipientId });
      console.log('Joined room');

      socket.on('receiveMessage', message => {
        console.log('Received message:', message);
        setChat(prevChat => [...prevChat, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [senderId, recipientId]);

  const sendMessage = async () => {
    if (message.trim() === '' || !senderId || !recipientId) return;

    const messageObject = {
      sender: senderId,
      recipient: recipientId,
      content: message,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', messageObject);
    setMessage('');
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const uniqueKey = (item, index) => index.toString();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={chat}
        keyExtractor={uniqueKey}
        renderItem={({ item }) => (
          <View
            className={`mb-2 p-2 ${
              item.sender === senderId
                ? 'bg-blue-200 self-end'
                : 'bg-gray-200 self-start'
            } rounded-lg`}
          >
            <Text
              className={`text-lg mt-1 ${
                item.sender === senderId ? 'text-blue-800' : 'text-gray-800'
              }`}
            >
              {item.content}
            </Text>
            <Text className="text-xs text-gray-500 text-right">
              {formatTime(item.timestamp)}
            </Text>
          </View>
        )}
      />
      <View className="flex-row items-center mt-4">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={'gray'}
          className="flex-1 p-2 bg-white border text-black border-gray-300 rounded-lg"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 bg-blue-500 p-2 rounded-full"
        >
          <MaterialIcons name="send" size={23} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

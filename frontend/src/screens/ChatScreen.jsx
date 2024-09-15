import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';
import {baseUrl} from '../utils';

// Replace this with your ngrok URL or backend server URL
const socket = io(baseUrl);

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const userId = "66d5dadfac521b59531f1973"
  const recipientId = "66d595fbbab7919b300ed843"

  useEffect(() => {
    // Join the room for the current user
    socket.emit('joinRoom', userId);

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
    <View>
      {/* Chat history */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.senderId === userId ? 'Me' : 'Them'}: {item.content}
          </Text>
        )}
      />

      {/* Input for typing a message */}
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
      />

      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;

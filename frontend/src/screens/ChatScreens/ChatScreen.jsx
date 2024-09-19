import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import {baseUrl} from '../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const socket = io(baseUrl);

const ChatScreen = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');

  const {sender, recipient} = route.params;

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const senderResponse = await axios.get(
          `${baseUrl}/api/v1/auth/getUserId/${sender}`,
        );
        const recipientResponse = await axios.get(
          `${baseUrl}/api/v1/auth/getUserId/${recipient}`,
        );

        setSenderId(senderResponse.data.data.id);
        setRecipientId(recipientResponse.data.data.id);

        try {
          const messagesResponse = await axios.get(
            `${baseUrl}/api/v1/chat/messages/${senderResponse.data.data.id}/${recipientResponse.data.data.id}`,
          );
          // console.log(messagesResponse.data.data);
          const data = messagesResponse.data.data;

          if (data.messages.length !== 0) {
            setChat(data.messages);
          } else {
            setChat([]);
          }
        } catch (error) {
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
      socket.emit('joinRoom', {sender: senderId, recipient: recipientId});
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

  const sendMedia = () => {
    console.log('Send media');
  };

  return (
    <View className="flex-1" style={{backgroundColor: '#12191f'}}>
  <ImageBackground
    source={require('../../assets/w-b-g.jpg')}
    resizeMode="cover"
    className="px-3 py-3 flex-1 justify-center">
    <FlatList
      data={chat}
      keyExtractor={uniqueKey}
      renderItem={({item}) => (
        <View
          className={`mb-2 p-2 ${
            item.sender === senderId ? 'self-end' : 'self-start'
          } rounded-lg`}
          style={{
            backgroundColor:
              item.sender === senderId ? '#134d37' : '#1f2c34',
          }}>
          <Text className={`text-lg mt-1`} style={{color: '#f0f0f0'}}>
            {item.content}
          </Text>
          <Text className="text-xs text-gray-500 text-right">
            {formatTime(item.timestamp)}
          </Text>
        </View>
      )}
    />
    <View className="flex-row items-center mt-4">
      <View className="flex-row flex-1 relative">
        {/* TextInput Field */}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={'#a3a3a3'}
          cursorColor={'white'}
          className="flex-1 py-2 px-4 text-slate-300 rounded-3xl"
          style={{
            backgroundColor: '#1f2c34',
            textAlignVertical: 'center', // Center text vertically
            minHeight: 40, // Ensure sufficient height
          }}
          multiline={true}
        />

        {/* Attach Icon */}
        {message === '' && (
          <TouchableOpacity
            onPress={sendMedia}
            style={{
              position: 'absolute',
              right: 48,
              top: '50%',
              transform: [{translateY: -12}],
            }}>
            <MaterialIcons name="attach-file" size={23} color={'white'} />
          </TouchableOpacity>
        )}

        {/* Camera Icon */}
        {message === '' && (
          <TouchableOpacity
            onPress={sendMedia}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: [{translateY: -12}],
            }}>
            <MaterialIcons name="photo-camera" size={23} color={'white'} />
          </TouchableOpacity>
        )}
      </View>

      {/* Send/Mic Button */}
      {message === '' ? (
        <TouchableOpacity
          onPress={sendMedia}
          className="ml-2 p-2 rounded-full"
          style={{backgroundColor: '#21c063'}}>
          <MaterialIcons name="mic" size={23} color={'black'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 p-2 rounded-full"
          style={{backgroundColor: '#21c063'}}>
          <MaterialIcons name="send" size={23} color={'black'} />
        </TouchableOpacity>
      )}
    </View>
  </ImageBackground>
</View>
  );
};

export default ChatScreen;

import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import {baseUrl} from '../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import MessageInput from '../../components/MessageInput';
import {
  selectFile,
  uploadFile,
  sendMessage,
  fetchUserIds,
  handleImagePress,
  formatTime,
  handleLongPressEnd,
  handleLongPressStart,
  handlePanelAction,
  closeViewer,
} from '../../utils/chatHelpers';
import {setHeaderLeft, setHeaderRight} from '../../components/ChatHeader';
import MessageList from '../../components/MessageList';
import ImageViewerComponent from '../../components/ImageViewerComponent';

const socket = io(baseUrl);

const ChatScreen = ({navigation, route}) => {
  const [message, setMessage] = useState({
    message: '',
    mediaUrl: {url: '', type: ''},
  });
  const [chat, setChat] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [fileResponse, setFileResponse] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State to hold profile picture URL
  const {sender, recipient, recipientName} = route.params;
  const flatListRef = useRef(null); // Create FlatList reference
  const videoRef = useRef(null); // Reference to the video player
  const [panelPosition, setPanelPosition] = useState({x: 0, y: 0});
  const [activeItemId, setActiveItemId] = useState(null); // State to track the active item
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [isViewerVisible, setIsViewerVisible] = useState(false); // Track ImageViewer visibility
  const [viewerData, setViewerData] = useState({ imageUrl: '', videoUrl: '', senderName: '', type: '' }); // Data for ImageViewer

  useEffect(() => {
    fetchUserIds(
      sender,
      recipient,
      setSenderId,
      setRecipientId,
      setProfilePicture,
      setChat,
    );
    if (senderId && recipientId) {
      socket.emit('joinRoom', {sender: senderId, recipient: recipientId});

      socket.on('receiveMessage', message => {
        setChat(prevChat => [...prevChat, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [senderId, recipientId]);

  // Set the profile picture in the header
  useLayoutEffect(() => {
    if (profilePicture) {
      navigation.setOptions({
        headerLeft: () => setHeaderLeft(navigation, profilePicture),
        headerRight: () => setHeaderRight(),
        headerTitle: recipientName,
        headerStyle: {
          backgroundColor: '#12191f', // Ensure consistent header background color
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
          borderBottomWidth: 0, // Removes bottom border on iOS
        },
      });

    }
  }, [profilePicture]);

  // Scroll to the end when chat data changes
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [chat]);

  return (
    <View className="flex-1" style={{backgroundColor: '#12191f'}}>
      <ImageBackground
        source={require('../../assets/w-b-g.jpg')}
        resizeMode="cover"
        className="py-3 flex-1 justify-center">

        <MessageList 
          chat={chat}
          flatListRef={flatListRef}
          senderId={senderId}
          recipientName={recipientName}
          videoRef={videoRef}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
          handleLongPressStart={handleLongPressStart}
          handleLongPressEnd={handleLongPressEnd}
          handleImagePress={handleImagePress}
          closeViewer = {closeViewer}
          handlePanelAction={handlePanelAction}
          formatTime={formatTime}
          setPanelPosition={setPanelPosition}
          setLongPressTimer={setLongPressTimer}
          panelPosition={panelPosition}
          longPressTimer={longPressTimer}
          navigation={navigation}
          viewerData={viewerData}
          setIsViewerVisible={setIsViewerVisible}
          setViewerData={setViewerData}
        />

        <MessageInput
          message={message}
          setMessage={setMessage}
          fileResponse={fileResponse}
          selectFile={() => selectFile(setFileResponse, setMessage)}
          sendMessage={() =>
            sendMessage(
              message,
              senderId,
              recipientId,
              setMessage,
              setFileResponse,
            )
          }
          uploadFile={() =>
            uploadFile(
              fileResponse,
              setFileResponse,
              message,
              senderId,
              recipientId,
              setMessage,
            )
          }
        />
        
      </ImageBackground>
    </View>
  );

};

export default ChatScreen;

import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import AudioPlayer from './AudioPlayer';

const MessageItem = ({
  item,
  senderId,
  recipientName,
  videoRef,
  activeItemId,
  setActiveItemId,
  handleLongPressStart,
  handleLongPressEnd,
  handleImagePress,
  handlePanelAction,
  formatTime,
  setPanelPosition,
  setLongPressTimer,
  longPressTimer,
  navigation, // Add
  closeViewer, // Add
  viewerData, // Add
  setIsViewerVisible, // Add
  setViewerData, // Add
}) => (
  
    <TouchableOpacity
    onPressIn={event => {
      handleLongPressStart(event, item , setPanelPosition , setActiveItemId , setLongPressTimer);
      // setActiveItemId(item._id);
    }}
    onPressOut={() => {
      handleLongPressEnd(longPressTimer);
    }}
    activeOpacity={0.9}>
    <View>
      <View
        className={`mb-2 p-2 ${
          item.sender === senderId ? 'self-end' : 'self-start'
        } rounded-lg`}
        style={{
          backgroundColor: item.sender === senderId ? '#134d37' : '#1f2c34',
        }}>
        {item.content.mediaUrl.url !== '' ? (
          item.content.mediaUrl.type === 'image' ? (
            <TouchableOpacity
              onPress={() =>
                handleImagePress({
                  imageUrl: item.content.mediaUrl.url,
                  senderName: recipientName,
                  type: 'image',
                  audio : item.content.mediaUrl.audio,
                  navigation
                 
                })
              }
              style={{alignSelf: 'center'}}
              activeOpacity={0.9}>
              <Image
                source={{uri: item.content.mediaUrl.url}}
                style={{
                  width: '70%',
                  height: undefined,
                  aspectRatio: 1,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : item.content.mediaUrl.audio ? (
            
              <AudioPlayer audioUri={item.content.mediaUrl.url} />
          ): (
            <TouchableOpacity
              onPress={() =>
                handleImagePress({
                  videoUrl: item.content.mediaUrl.url,
                  senderName: recipientName,
                  type: 'video',
                  audio : item.content.mediaUrl.audio,
                  navigation
                 
                })
              }
              style={{alignSelf: 'center'}}
              activeOpacity={0.9}>
              <Video
                source={{uri: item.content.mediaUrl.url}}
                ref={videoRef}
                paused={true}
                style={{
                  width: '70%',
                  height: undefined,
                  aspectRatio: 1,
                }}
                resizeMode="cover"
              />
              <MaterialIcons
                name="play-circle-outline"
                size={50}
                color="white"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 115,
                  transform: [{translateX: -25}, {translateY: -25}],
                }}
              />
            </TouchableOpacity>
          )
        ) : (
          <Text className="text-lg mt-1" style={{color: '#f0f0f0'}}>
            {item.content.message}
          </Text>
        )}
        <Text className="text-xs text-gray-500 text-right">
          {formatTime(item.timestamp)}
        </Text>
        {activeItemId === item._id ? (
          <Animated.View
            className="flex-row bg-slate-200 p-3 justify-around w-2/4 border-solid rounded-3xl"
            style={{
              flex: 1,
              position: 'absolute',
              top: 40,
              right: 40,
              zIndex: 1, // Add a high zIndex value to ensure it stays on top
            }}>
            <TouchableOpacity onPress={() => handlePanelAction('edit',setActiveItemId)}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePanelAction('delete',setActiveItemId)}>
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePanelAction('reply',setActiveItemId)}>
              <MaterialIcons name="reply" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePanelAction('close',setActiveItemId)}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

export default MessageItem;

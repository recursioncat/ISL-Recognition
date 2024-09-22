import React from 'react';
import {TouchableOpacity, View, Image, Text, ScrollView} from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import AudioPlayer from './AudioPlayer';
import {serviceActions} from '../utils';
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
      handleLongPressStart(
        event,
        item,
        setPanelPosition,
        setActiveItemId,
        setLongPressTimer,
      );
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
                  audio: item.content.mediaUrl.audio,
                  navigation,
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
          ) : (
            <TouchableOpacity
              onPress={() =>
                handleImagePress({
                  videoUrl: item.content.mediaUrl.url,
                  senderName: recipientName,
                  type: 'video',
                  audio: item.content.mediaUrl.audio,
                  navigation,
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
            className="absolute top-10 right-10 z-50 p-3 rounded-3xl border border-slate-300"
            style={{
              width: '80%', // Increased width for better display
              backgroundColor: '#12191f',
              shadowColor: '#fff',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5, // Adds shadow for Android
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false} // Hides the scroll bar for a cleaner look
              contentContainerStyle={{alignItems: 'center'}} // Centers the icons vertically
            >
              {serviceActions.map(({action, icon}) => (
                <TouchableOpacity
                  onPress={() =>
                    handlePanelAction(
                      action,
                      setActiveItemId,
                      senderId,
                      item.content.message,
                      item.content.mediaUrl,
                    )
                  }
                  key={action}
                  style={{
                    marginHorizontal: 10, // Adds spacing between icons
                    padding: 5, // Adds padding around the icon for better touchability
                    borderRadius: 50, // Circular background
                    backgroundColor: '#fff', // White background for the icons
                    elevation: 3, // Adds shadow for touch effect
                  }}>
                  <MaterialIcons name={icon} size={24} color="black" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

export default MessageItem;

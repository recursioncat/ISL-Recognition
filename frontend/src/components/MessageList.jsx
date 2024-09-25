import React from 'react';
import { FlatList } from 'react-native';
import MessageItem from './MessageItem';

const MessageList = ({
  chat,
  flatListRef,
  senderId,
  recipientName,
  videoRef,
  activeItemId,
  setActiveItemId,
  handleLongPressStart,
  handleLongPressEnd,
  handleImagePress,
  closeViewer,
  handlePanelAction,
  formatTime,
  setPanelPosition,
  setLongPressTimer,
  panelPosition,
  longPressTimer,
  navigation,
  viewerData,
  setIsViewerVisible,
  setViewerData,
}) => {
  const renderItem = ({ item }) => (
    <MessageItem
      item={item}
      senderId={senderId}
      recipientName={recipientName}
      videoRef={videoRef}
      activeItemId={activeItemId}
      setActiveItemId={setActiveItemId}
      handleLongPressStart={handleLongPressStart}
      handleLongPressEnd={handleLongPressEnd}
      handleImagePress={handleImagePress}
      handlePanelAction={handlePanelAction}
      formatTime={formatTime}
      setPanelPosition={setPanelPosition}
      setLongPressTimer={setLongPressTimer}
      panelPosition={panelPosition}
      longPressTimer={longPressTimer}
      navigation={navigation}
      closeViewer={closeViewer}
      viewerData={viewerData}
      setIsViewerVisible={setIsViewerVisible}
      setViewerData={setViewerData}
    />
  );

  return (
    <FlatList
      className="px-3"
      ref={flatListRef}
      data={chat}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
      contentContainerStyle={{ paddingBottom: 0 }}
      onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      initialNumToRender={10}
      windowSize={5}
    />
  );
};

export default MessageList;

import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MessageInput = ({
  message,
  setMessage,
  fileResponse,
  selectFile,
  sendMessage,
  uploadFile,
}) => {
  return (
    <View className="flex-row items-center mt-4 px-3">
      <View className="flex-row flex-1 relative">
        {fileResponse ? (
          <Text
            className="flex-1 py-2 px-4 text-slate-300 rounded-3xl"
            style={{backgroundColor: '#1f2c34'}}>
            {fileResponse.name}
          </Text>
        ) : (
          <TextInput
            value={message.message}
            onChangeText={text => setMessage({...message, message: text})}
            placeholder="Type a message..."
            placeholderTextColor={'#a3a3a3'}
            cursorColor={'white'}
            className="flex-1 py-2 px-4 text-slate-300 rounded-3xl"
            style={{
              backgroundColor: '#1f2c34',
              textAlignVertical: 'center',
              minHeight: 40,
            }}
            multiline={true}
          />
        )}

        {message.message === '' && (
          <>
            <TouchableOpacity
              onPress={selectFile}
              style={{
                position: 'absolute',
                right: 48,
                top: '50%',
                transform: [{translateY: -12}],
              }}>
              <MaterialIcons name="attach-file" size={23} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={selectFile}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: [{translateY: -12}],
              }}>
              <MaterialIcons name="photo-camera" size={23} color={'white'} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={fileResponse ? uploadFile : sendMessage}
        className="ml-2 p-2 rounded-full"
        style={{backgroundColor: '#21c063'}}>
        <MaterialIcons
          name={fileResponse ? 'send' : message.message === '' ? 'mic' : 'send'}
          size={23}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

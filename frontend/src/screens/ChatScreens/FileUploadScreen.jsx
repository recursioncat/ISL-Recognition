import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { baseUrl } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FileUploadScreen = () => {
  const [fileResponse, setFileResponse] = useState(null);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // You can limit the types if needed
      });
      setFileResponse(res);
      console.log('File selected:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the file picker');
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  const uploadFile = async () => {
    if (!fileResponse) return;

    const formData = new FormData();
    formData.append('mediaUpload', {
      uri: fileResponse[0].uri,
      type: fileResponse[0].type,
      name: fileResponse[0].name,
    });

    try {
      const response = await axios.post(`${baseUrl}/api/v1/sender/upload-media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token' : await AsyncStorage.getItem('token')
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <View>
      <Button title="Select File" onPress={selectFile} />
      {fileResponse && (
        <View>
          <Text className="text-black">Selected File: {fileResponse[0].name}</Text>
          <Button title="Upload File" onPress={uploadFile} />
        </View>
      )}
    </View>
  );
};

export default FileUploadScreen;

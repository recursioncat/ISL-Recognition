import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import BackButton from '../components/BackButton';
import { baseUrl } from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function SignToText({ navigation }) {
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [imageData, setImageData] = useState('');
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);
  const [back, setBack] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [apiResponse, setApiResponse] = useState(null); // State to handle API response
  const [predictedData, setPredictedData] = useState("");

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log('Camera permission: ', newCameraPermission);
  };

  const takePicture = async () => {
    if (camera.current == null) return;

    
    const image = await camera.current.takePhoto();
    setImageData(image.path);
    setTakePhotoClicked(true);
    sendImageToBackend(image.path);
   
    
  };

  const sendImageToBackend = async (imagePath) => {
    setLoading(true); // Show loading indicator
    const formData = new FormData();
    formData.append('aiUpload', {
      uri: 'file://' + imagePath,
      type: 'image/jpeg', // Adjust type as needed
      name: 'photo.jpg',
    });

    try {
      const response = await fetch(`${baseUrl}/api/v1/ai/upload/sendimageai`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        setApiResponse(data); // Save the response data
        setPredictedData(data.data.predictedData); // Save the predicted data
        console.log('Image uploaded successfully', data);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false); // Hide loading indicator after response is received
    }
  };

  if (device == null) return <ActivityIndicator />;

  return (
    <>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      {back && (
        <TouchableOpacity onPress={() => navigation.navigate('EngToSign')} className="ml-4 mt-5">
          <BackButton />
        </TouchableOpacity>
      )}
      <Text className="text-4xl font-bold text-center mt-5 text-black">Sign to Text</Text>
      <View className="flex-1 justify-center items-center">
        {!takePhotoClicked ? (
          <View className="w-64 h-64 border-2 border-gray-300 justify-center items-center relative">
            <Text className="text-center text-gray-700">Take a photo</Text>
            <TouchableOpacity
              onPress={() => {
                setTakePhotoClicked(true);
                setBack(true);
              }}
              className="absolute bottom-4 bg-white p-4 rounded-full"
            >
              <Text className="text-black">Open Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-64 h-64 relative">
            {imageData ? (
              <View className="w-full h-full justify-center items-center">
                <Image source={{ uri: 'file://' + imageData }} className="w-64 h-64" />
                <View className="justify-center mx-auto mt-5">
                  <TouchableOpacity
                    onPress={() => {
                      setImageData('');
                      setTakePhotoClicked(true);
                      setBack(true);
                      setApiResponse(null); // Reset API response
                    }}
                    className="bg-white p-4 rounded-full"
                  >
                    <Text className="text-black">Retake</Text>
                  </TouchableOpacity>
                  {loading && ( // Show loading indicator under Retake button
                    <ActivityIndicator size="small" color="#000" className="mt-2" />
                  )}
                  {apiResponse && ( // Display API response if available
                  <View>
                    {/* <Text className="text-center text-green-500 mt-2">{apiResponse.message}</Text> */}
                    <Text className="text-center text-lg text-green-500 mt-2">{predictedData}</Text>
                  </View>
                  )}
                </View>
              </View>
            ) : (
              <Camera
                ref={camera}
                className="w-full h-full"
                device={device}
                isActive={!imageData}
                photo
              />
            )}
            {!imageData && (
              <View className="h-full justify-center m-auto">
                <TouchableOpacity
                  onPress={takePicture}
                  className="bg-white p-6 rounded-full"
                >
                  <Text className="text-black">Click</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        <View className="absolute bottom-5 right-2">
            <MaterialIcons name="swap-vert" size={50} color={"black"} className="ml-2" onPress={() => navigation.replace("EngToSign")} />
          </View>
      </View>
    </>
  );
}

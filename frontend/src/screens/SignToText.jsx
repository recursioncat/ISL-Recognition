import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import BackButton from '../components/BackButton';
import { baseUrl } from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function SignToText({ navigation }) {
  const [cameraDevice, setCameraDevice] = useState('front');
  const device = useCameraDevice(cameraDevice);
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
      <StatusBar backgroundColor="#000000" barStyle="light-content"/>

      <View className="flex-1 justify-center items-center bg-black">
        
          <View className="w-full h-full ">
               
              <Camera
                ref={camera}
                className="w-full h-full mt-1"
                device={device}
                isActive={!imageData}
                photo
                
              />
               <View className="absolute top-3 left-2  items-center">
                    <MaterialIcons name="arrow-back-ios" size={25} color="#ffffff" className="" onPress={() => navigation.replace("EngToSign")} />
                </View>
                
              <View className="h-28 w-full absolute bottom-0" style={{backgroundColor:'rgba(0, 0, 0, 0.89)'}}>

                <View className="absolute bottom-8 left-5">
                    <MaterialIcons name="swap-vertical-circle" size={40} color={"white"} className="" onPress={() => navigation.replace("EngToSign")} />
                </View>

                <View className="absolute bottom-5 left-[150]">
                <TouchableOpacity onPress={takePicture} className="flex-1 justify-center items-center">
                  <View className="items-center my-auto">
                    {/* Outer circle */}
                    <View className="border-4 border-white bg-transparent rounded-full p-1">
                      {/* Inner circle */}
                      <View className="border-2 border-white bg-white rounded-full p-6" />

                    </View>
                  </View>
                </TouchableOpacity>
                </View>
                <View className="absolute bottom-9 right-5">
                    <MaterialIcons name="flip-camera-ios" size={35} color={"white"} className="" onPress={() => cameraDevice === "front" ? setCameraDevice("back") : setCameraDevice("front")} />
                </View>

              </View>

          </View>
       
      </View>
    </>
  );
}

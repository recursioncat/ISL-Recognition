import React, { useState, useRef } from 'react';
import { View, Image, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { suggestions } from '../utils/index.js';
import Video from 'react-native-video';

const EngToSign = ({ navigation }) => {
  const [translationText, setTranslationText] = useState('');
  const [videoSource, setVideoSource] = useState(null); // State for the current video source
  const [isVideoLoading, setIsVideoLoading] = useState(false); // State to manage video loading
  const [playCount, setPlayCount] = useState(0); // State to track the number of plays
  const videoRef = useRef(null);

  // Handle text change in input
  const handleTextChange = (text) => {
    setTranslationText(text);
  };

  // Handle the send button click or suggested message click
  const handlePlayVideo = (text) => {
    if (!text) return;

    setIsVideoLoading(true);
    setTranslationText(text);

    // Assume you have a mapping of text to video files
    const videoMap = {
      "hello": require('../assets/ISL_hello_AM_v2.mp4'),
      "help" : require('../assets/ISL_Help_AM.mp4'),
      "are_you_okay" : require('../assets/ISL_Are_u_okay_AM.mp4'),
      "take_medicine" : require('../assets/ISL_Take_Medichine_AM.mp4'),
      "i_am_fine" : require('../assets/I_am_fine_AM.mp4'),
      // Add more mappings as needed
    };

    
    setVideoSource(videoMap[text.toLowerCase().trim().replace(/ /g, '_')]);
    setPlayCount(0); // Reset play count when a new video is selected
  };

  // Handle video load event
  const handleVideoLoad = () => {
    setIsVideoLoading(false); // Hide the loading state once the video is loaded
  };

  // Handle video end event
  const handleVideoEnd = () => {
    setPlayCount((prevCount) => prevCount + 1);
    if (playCount < 1) {
      videoRef.current.seek(0); // Replay the video once
    } else {
      setVideoSource(null); // Stop the video after two plays
    }
  };

  return (
    <>
    <View className="h-full w-full" style={{backgroundColor: '#c8cbb7'}}>
        <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Content */}
        <View className="mt-2 mb-5 mx-6 border-solid  rounded-xl h-4/5 justify-center relative">
          {/* Image as placeholder while loading video or when no video is selected */}
          {(isVideoLoading || !videoSource) && (
            <View className="w-full h-full justify-center items-center">
              <Image source={require('../assets/3dmodel.png')} className="w-full border-solid rounded-xl h-full mx-auto" />
              {isVideoLoading && (
                <Text className="absolute text-white font-semibold text-lg bottom-5">Loading your video...</Text>
              )}
            </View>
          )}

          {/* Video Player */}
          {videoSource && (
            <Video
              source={videoSource}
              ref={videoRef}
              className="w-full border-solid rounded-xl h-full mx-auto"
              onLoad={handleVideoLoad} // Handle video load event
              onEnd={handleVideoEnd} // Handle video end event
              onError={() => setIsVideoLoading(false)} // Handle errors
              paused={isVideoLoading} // Pause the video if loading
              resizeMode="cover" // Resize mode for video
              style={{ display: isVideoLoading ? 'none' : 'flex' }} // Hide video until it's loaded
              repeat={false} // No continuous repeat
            />
          )}

          {/* Swap Button */}
          <View className="absolute bottom-5 right-2">
            <MaterialIcons name="swap-vert" size={50} color={"white"} className="ml-2" onPress={() => navigation.navigate("SignToText")} />
          </View>
        </View>
        
        <View className="bg-slate-50 py-3">
        {/* Suggested Messages */}
        <ScrollView horizontal={true} className="flex-row gap-2 mx-9">
          {suggestions.map((message) => (
            <TouchableOpacity key={message.id} onPress={() => handlePlayVideo(message.message)}>
              <View>
                <Text className="text-center text-white border-solid rounded-md bg-black px-2 py-1 text-md font-semibold">
                  {message.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex mx-7 flex-row items-center mt-2 mb-2">
            <View className="w-5/6 mx-2 border-solid border-zinc-200 border-2 rounded-md px-2">
              <TextInput
                placeholder="Type to Translate"
                value={translationText}
                onChangeText={handleTextChange}
                placeholderTextColor="black"
                className="pr-10 text-black"
              />

              {translationText === '' && (
                <View className="absolute right-3 top-1/4 transform -translate-y-1/2">
                  <FontAwesome5 name="camera" size={23} color="#fbb06a" />
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => handlePlayVideo(translationText)}
              className="mx-auto bg-red-300 w-10 h-10 justify-center items-center border-solid rounded-3xl"
            >
              {translationText === '' ? (
                <MaterialIcons name="keyboard-voice" size={23} color={"white"} className="ml-2" />
              ) : (
                <MaterialIcons name="send" size={23} color={"white"} className="ml-2" />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
      </View>
    </>
  );
};

export default EngToSign;

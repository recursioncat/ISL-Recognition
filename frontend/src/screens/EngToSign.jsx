import React, { useState, useRef, Suspense } from 'react';
import { View, Image, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { suggestions } from '../utils/index.js';
import { Canvas } from '@react-three/fiber';
import useControls from 'r3f-native-orbitcontrols';
import Character from '../components/Charecter.jsx';

const EngToSign = ({ navigation }) => {
  const [translationText, setTranslationText] = useState('');
  const [OrbitControls, events] = useControls();

  const handleTextChange = (text) => {
    setTranslationText(text);
  };

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: '#c8cbb7' }}>
      <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View className="mt-2 mb-5 mx-6 border-solid rounded-xl h-4/5 justify-center relative" {...events}>
        <Canvas
          onCreated={(state) => {
            const _gl = state.gl.getContext();

            // Override pixelStorei to handle unsupported parameters in expo-gl
            const originalPixelStorei = _gl.pixelStorei.bind(_gl);
            _gl.pixelStorei = function (parameter, value) {
              if (parameter === _gl.UNPACK_FLIP_Y_WEBGL) {
                return originalPixelStorei(parameter, value);
              }
              // Ignore unsupported parameters to avoid the warning
            };
          }}
        >
            <OrbitControls />
            <Suspense fallback={null}>
              <ambientLight intensity={3} />
              <Character />
            </Suspense>
          </Canvas>

          <View className="absolute bottom-5 right-2">
            <MaterialIcons
              name="swap-vert"
              size={50}
              color="white"
              onPress={() => navigation.navigate("SignToText")}
            />
          </View>
        </View>

        <View className="bg-slate-50 py-3">
          <ScrollView horizontal className="flex-row gap-2 mx-9">
            {suggestions.map((message) => (
              <TouchableOpacity key={message.id} onPress={() => console.log("Handle model animation")}>
                <View>
                  <Text className="text-center text-white border-solid rounded-md bg-black px-2 py-1 text-md font-semibold">
                    {message.message}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
              onPress={() => console.log('Translate')}
              className="mx-auto bg-red-300 w-10 h-10 justify-center items-center border-solid rounded-3xl"
            >
              {translationText === '' ? (
                <MaterialIcons name="keyboard-voice" size={23} color="white" />
              ) : (
                <MaterialIcons name="send" size={23} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
  //  </KeyboardAvoidingView> 
  );
};

export default EngToSign;

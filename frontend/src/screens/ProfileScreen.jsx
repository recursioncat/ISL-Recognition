import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../utils';

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/user/getuser`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    Toast.show({
      type: 'success',
      text1: 'Logged out successfully',
      visibilityTime: 3000,
      autoHide: true,
    });

    AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-500 py-4 items-center">
        <Text className="text-white text-2xl font-bold">Profile</Text>
      </View>

      {/* Profile Picture Section */}
      <View className="items-center mt-[-50px]">
        <View className="relative">
          <Image
            source={require('../assets/logo21.png')}
            className="w-36 h-36 rounded-full border-4 border-white bg-slate-100"
          />
          {/* Uncomment if you want to add an edit icon for profile picture */}
          {/* <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
            <Text className="text-white text-xs">✎</Text>
          </TouchableOpacity> */}
        </View>
        <Text className="text-2xl font-semibold text-gray-800 mt-2">{userDetails.name}</Text>
        {/* <Text className="text-lg text-gray-600 mt-1">{userDetails.phone}</Text> */}
      </View>

      {/* Profile Information */}
      <View className="px-5 mt-5">
        <Text className="text-lg text-blue-500 mb-1">YOUR EMAIL</Text>
        <Text className="text-xl font-semibold text-gray-800 mb-3">{userDetails.email}</Text>

        <Text className="text-lg text-blue-500 mb-1">Gender</Text>
        <Text className="text-xl font-semibold text-gray-800 mb-3">{userDetails.gender}</Text>

        <TouchableOpacity
          className="bg-red-500 py-4 rounded-md mt-10 items-center"
          onPress={handleLogout}
        >
          <Text className="text-white text-lg font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

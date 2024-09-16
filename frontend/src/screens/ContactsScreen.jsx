import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../utils';

const contacts = [
  { id: '1', name: 'John Doe', profilePic: 'https://via.placeholder.com/150',email: 't@g.com' },
  { id: '2', name: 'Jane Smith', profilePic: 'https://via.placeholder.com/150' , email:'raina7371@gmail.com' },
  // Add more contacts here
];

export default function ContactsScreen({ navigation }) {

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {

    const fetchUserEmail = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${baseUrl}/api/v1/user/getuser`, {
          headers: {
            'x-auth-token': token
          }
        });

        setUserEmail(response.data.data.email); // Extract the email from the response

      } catch (error) {
        console.error('Error fetching or decoding token:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', {sender :userEmail ,recipient: item.email})}
      className="flex-row items-center p-4 border-b border-gray-200"
    >
      <Image
        source={{ uri: item.profilePic }}
        className="w-12 h-12 rounded-full"
      />
      <Text className="ml-4 text-lg font-semibold">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

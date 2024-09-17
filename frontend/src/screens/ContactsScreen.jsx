import React, { useEffect, useState , useContext } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import { baseUrl } from '../utils';
import { UserContext } from '../context/UserContext'; // Import UserContext

export default function ContactsScreen({ navigation }) {

  // const [userEmail, setUserEmail] = useState(null);
  const { userEmail } = useContext(UserContext); // Access userEmail from context
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch contacts once userEmail is set
  useEffect(() => {
    const fetchContacts = async () => {
      if (userEmail) {
        try {
          const response = await axios.get(`${baseUrl}/api/v1/friend/get-friends/${userEmail}`);
          setContacts(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching contacts:', error);
          setError('Failed to fetch contacts.');
        }
      }
    };

    fetchContacts();
  }, [userEmail]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', { sender: userEmail, recipient: item.email })}
      className="flex-row items-center p-4 border-b border-gray-200"
    >
      <Image
        source={{ uri: item.profilePicture }}
        className="w-12 h-12 rounded-full bg-gray-200"
      />
      <Text className="ml-4 text-lg font-semibold">{item.userName}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <Text className="text-center mt-4">Loading...</Text>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.userId}
        />
      )}
    </View>
  );
}

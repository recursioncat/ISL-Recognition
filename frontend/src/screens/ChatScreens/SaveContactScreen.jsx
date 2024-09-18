import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { baseUrl } from '../../utils';
import Toast from 'react-native-toast-message';
import {BackButton} from '../../components';


const SaveContactScreen = ({ navigation }) => {
  const { userEmail } = useContext(UserContext); // Get userEmail from UserContext
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveContact = async () => {
    // Input validation
    if (!firstName || !email) {
      setError('Please fill in the required fields.');
      return;
    }

    // Combine firstName and lastName
    const fullName = `${firstName} ${lastName}`;

    // Reset error before submission
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/v1/friend/save-friend`, {
        userName : fullName,
        friendEmail :email,
        userEmail, // Send the current user's email as context
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Contact Saved',
          text2: `${fullName} has been added to your contacts.`,
        });

        // Optionally navigate back to contacts list or reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        navigation.goBack(); // Go back to previous screen
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      setError('Failed to save contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-6 justify-center bg-gray-900">
    <BackButton goBack={navigation.goBack} />
      <Text className="text-xl font-bold text-white mb-6 text-center">New Contact</Text>

      <View className="flex-row items-center border-b border-gray-600 mb-4">
        <Text className="text-white mr-2">👤</Text>
        <TextInput
          className="h-12 flex-1 border-none text-white"
          placeholder="First name"
          placeholderTextColor="#a3a3a3"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>

      <View className="flex-row items-center border-b border-gray-600 mb-4">
        <Text className="text-white mr-2">👤</Text>
        <TextInput
          className="h-12 flex-1 border-none text-white"
          placeholder="Last name"
          placeholderTextColor="#a3a3a3"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      <View className="flex-row items-center border-b border-gray-600 mb-4">
        <Text className="text-white mr-2">📧</Text>
        <TextInput
          className="h-12 flex-1 border-none text-white"
          placeholder="Email"
          placeholderTextColor="#a3a3a3"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <TouchableOpacity
          className="bg-green-500 h-12 rounded-lg flex justify-center items-center"
          onPress={handleSaveContact}
        >
          <Text className="text-white text-lg">Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SaveContactScreen;

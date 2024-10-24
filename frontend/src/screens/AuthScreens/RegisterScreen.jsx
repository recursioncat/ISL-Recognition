import React, { useState , useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import {Background , Logo, Header, Button, TextInput} from '../../components'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import { baseUrl } from '../../utils'


export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  
  const handleOtpSent = async ({ email }) => {
    // Validate input
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Invalid input',
        text2: 'Please fill in all fields',
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
      });
      return;
    }
  
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/sentotp`, {
        email,
      });
      
      return response.data.statusCode;

    } catch (error) {
      console.error('Reset Password Error:', error.message); // Improved error logging
      console.log(error);
      
      Toast.show({
        type: 'error',
        text1: 'Reset password failed',
        text2: error.response?.data?.message || 'Something went wrong!', // Show error details
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
      });
  
      return error.response?.data;
  };

  }

  const handleRegister = async ({ name, email, password }) => {
    // Validate input
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Invalid input',
        text2: 'Please fill in all fields',
        position: 'bottom',
        duration: 3000,
        swipeable: true,
      });
      return;
    }
  
    try {
     const response = await axios.post(`${baseUrl}/api/v1/auth/register` ,{
        fullName : name,
        email,
        password,
      });
  
      return response.data.statusCode;
    } catch (error) {
      console.error('Registration Error:', error.message); // Improved error logging
      console.log(error);
      
      Toast.show({
        type: 'error',
        text1: 'User registration failed',
        text2: error.response?.data?.message || 'Something went wrong!', // Show error details
        position: 'bottom',
        duration: 3000,
        swipeable: true,
      });
  
      return false;
    }
  };
  
  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
  
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  
    const response = await handleRegister({
      name: name.value,
      email: email.value,
      password: password.value,
    });

   
  
    if (response === 200) { 
      
      Toast.show({
        type: 'success',
        text1: 'User registration successful',
        text2: 'You have successfully registered!',
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
      });

      const responseOtp = await handleOtpSent({email: email.value});

      Toast.show({
        type: 'success',
        text1: 'OTP sent',
        text2: 'OTP sent successfully',
        position: 'bottom',
        visibilityTime: 1000,
        swipeable: true,
        
      });
      
      navigation.navigate('VerifyAccountScreen', { email: email.value });
    }
  };

  return (
    <Background>
     
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

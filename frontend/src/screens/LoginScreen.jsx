import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import LoginIcons from '../components/LoginIcons'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import { baseUrl } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const handleLogin = async ({ email, password }) => {
    // Validate input
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Invalid input',
        text2: 'Please fill in all fields',
        position: 'bottom',
        visibilityTime: 1000,
        swipeable: true,
      });
      return;
    }
  
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
        email,
        password,
      });
      
      return response.data;

    } catch (error) {
      console.error('Login Error:', error.message); // Improved error logging
      console.log(error);
      
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error.response?.data?.message || 'Something went wrong!', // Show error details
        position: 'bottom',
        duration: 3000,
        swipeable: true,
      });
  
      return error.response?.data;
  };
}

  const onLoginPressed = async() => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    const response = await handleLogin({ email: email.value, password: password.value });
    console.log(response);

    if (response.statusCode == "200") {
      await AsyncStorage.setItem('token', response.data);
      Toast.show({
        type: 'success',
        text1: 'User Login successful',
        text2: 'You have successfully logged in',
        position: 'bottom',
        visibilityTime: 1000,
        swipeable: true,
        onHide: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          });
        },
      });
  }
}

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      {/* <LoginIcons /> */}
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

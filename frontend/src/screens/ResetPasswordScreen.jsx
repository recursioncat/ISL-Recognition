import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import { baseUrl } from '../utils'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

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

  const sendResetPasswordEmail = async() => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    
    const response = await handleOtpSent({ email: email.value });
    if (response == 200) {
      Toast.show({
        type: 'success',
        text1: 'Email sent',
        text2: 'Please check your inbox',
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
        onHide : () => navigation.navigate('ForgotPassScreen',{email: email.value}),
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Email not sent',
        text2: 'Please try again',
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
      });
    }
   
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}

import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import { baseUrl } from '../utils'

export default function ForgotPassScreen({ navigation, route }) {
    
  const [otp, setOtp] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });

  const { email } = route.params;
  
    const handleOtpSent = async ({ email , otp , password , confirmPassword}) => {
      // Validate input
      if (!otp || !password || !confirmPassword) {
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

        const response = await axios.post(`${baseUrl}/api/v1/auth/resetpassword`, {
          email,otp,password,confirmPassword
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
      const passwordError = passwordValidator(password.value);
      const samePasswordError = passwordValidator(confirmPassword.value);

      const response = await handleOtpSent({ email:email , otp: otp.value, password: password.value, confirmPassword: confirmPassword.value });
      
      if (response == 200) {
        Toast.show({
          type: 'success',
          text1: 'Password reset', 
          text2: 'Password reset successfully',
          position: 'bottom',
          visibilityTime: 1000,
          swipeable: true,
          onHide: () => navigation.navigate('LoginScreen'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Password reset failed',
          text2: 'Check your otp and password',
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
          label="OTP code"
          returnKeyType="done"
          value={otp.value}
          onChangeText={(text) => setOtp({ value: text, error: '' })}
          error={!!otp.error}
          errorText={otp.error}
          autoCapitalize="none"
          description="You was received OTP code in your email."
        />
         <TextInput
        label="New Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        description="Password should be at least 5 characters long"
      />

    <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
        description="Please confirm your password"
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

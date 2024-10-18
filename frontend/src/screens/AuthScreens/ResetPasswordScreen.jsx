import React, { useState } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import { Header, TextInput } from '../../components'; 
import { emailValidator } from '../../helpers/emailValidator';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { baseUrl } from '../../utils';

//imported these
import GradientResetPassButton from '../../components/GradientResetPassButton'; 
import ResetPassLogo from '../../components/ResetPassLogo';
import ResetPassTextInput from '../../components/ResetPassTextInput';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const handleOtpSent = async ({ email }) => {
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
      Toast.show({
        type: 'error',
        text1: 'Reset password failed',
        text2: error.response?.data?.message || 'Something went wrong!',
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
      });

      return error.response?.data;
    }
  };

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoading(true);
    const response = await handleOtpSent({ email: email.value });
    setLoading(false);

    if (response === 200) {
      Toast.show({
        type: 'success',
        text1: 'Email sent',
        text2: 'Please check your inbox',
        position: 'bottom',
        visibilityTime: 3000,
        swipeable: true,
        onHide: () => navigation.navigate('ForgotPassScreen', { email: email.value }),
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
  };

  return (
    <View style={styles.container}>
      <ResetPassLogo/>
      {/* <Header style={styles.header}>
        Restore <Text style={styles.yellowText}>Password</Text>
      </Header> */}
      <View className="flex-row mb-2 " >
        <Text style={styles.firstText} className="text-slate-50 font-semibold ">Restore </Text>
        <Text style={styles.yellowText} className="font-semibold">Password</Text>
      </View>
      <ResetPassTextInput
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
        style={styles.textInput}
      />
      <Text style={styles.infoText}>
        You will receive an email with a password reset code.
      </Text>
      <GradientResetPassButton onPress={sendResetPasswordEmail} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  firstText: {
    color: '#fff',
    fontSize: 29,
    marginBottom: 4,
  },
  yellowText: {
    color: '#FFE70A',
    fontSize: 29,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#000',
    color: '#000',
    width: '100%',
    marginBottom: -5,
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 20,
  },
});

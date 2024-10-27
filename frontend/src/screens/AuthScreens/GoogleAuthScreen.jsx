import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '13700200648-nrcmepkts63h3r4teapaoco467vppvgh.apps.googleusercontent.com', 
});

 export default function GoogleAuthScreen () {
  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log(userInfo); // User info will be logged
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In with Google" onPress={signIn} />
      {userInfo && (
        <View>
          <Text>Welcome, {userInfo.data.user.name}</Text>
          <Text>Email: {userInfo.data.user.email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default GoogleAuthScreen;

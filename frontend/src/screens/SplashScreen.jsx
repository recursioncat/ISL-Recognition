import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext'; // Import UserContext

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const { userEmail, loading } = useContext(UserContext); // Access userEmail from context

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setAnimating(false); // Set animating false when check is done
        navigation.replace('AuthNavigator'); // Navigate to login if no token
      } else if (!loading && userEmail) {
        // Once userEmail is available and loading is done, navigate to main screen
        setAnimating(false); // Set animating false
        navigation.replace('Tabs');
      }
    };

    setTimeout(() => {
      checkAuthentication();
    }, 3000); // Splash screen delay
  }, [userEmail, loading, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo21.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating} // This controls the animation visibility
        color="#CACACA"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

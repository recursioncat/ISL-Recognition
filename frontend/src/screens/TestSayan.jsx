import React, {useState, useEffect} from 'react';

import {
  StatusBar,
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({navigation}) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
       
        //Check if user_id is set or not If not then send for Authentication else send to Home Screen
        //if isVerified is true then send to Home Screen else send to VerifyAccountScreen
       

        AsyncStorage.getItem('token').then((value) =>
          navigation.replace(
            value === null ? 'Tabs' : 'Tabs'
          ),
        );
      }, 4000);
    }, []);
  
    return (
      <View style={styles.container}>
        
        <StatusBar 
        backgroundColor="#131008"
        />
        <Image
          source={require('../assets/applogo3.png')}
          style={{width: '100%', resizeMode: 'contain', margin: 30}}
        />
        <ActivityIndicator
          animating={animating}
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
      backgroundColor: '#131008',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  });
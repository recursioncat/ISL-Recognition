import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';

import GradientButton from '../components/GradientButton';
import { LinearGradient } from 'react-native-linear-gradient';

const IntroScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate('AuthNavigator');
  };

  return (
    <View className="w-full h-full px-4" style={{ backgroundColor: '#000000' }}>
      <StatusBar backgroundColor="#000000" />

      {/* Image displayed smaller within the container */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/homepageImg.png')}
          style={styles.image}
        />
         {/* Gradient for the bottom fading effect */}
         <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 1)']} // From transparent to black
          style={styles.imageOverlay}
        />
      </View>

      <View className="mx-auto mt-8">
        <Text style={styles.title}>Welcome </Text>
        <Text style={styles.midtitle}>
          to <Text style={styles.apptitle}>SanketBani</Text>
        </Text>

        <Text style={styles.description} className="text-slate-200 mt-2">
          Easily connect with everyone using Indian Sign Language (ISL). Translate text, speech, and gestures to bridge the gap between deaf, mute, and hearing communities.
        </Text>
      </View>
      <View className="flex-1">
        <GradientButton onPress={handleButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 350, // Keep the container height as it is
    justifyContent: 'center', // Center the image vertically within the container
    alignItems: 'center', // Center the image horizontally within the container
    overflow: 'hidden', // Hide anything outside the container bounds
  },
  image: {
    width: '100%',
    height: 650,
    resizeMode: 'cover', // Ensure the image fits within the container's bounds while maintaining aspect ratio
    transform: [{ scale:0.8}], // Scale the image down to 60% of its original 
    top: 80, // Position the image at the top of the container
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100, // Adjust the height for the fading effect
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    color: '#fff',
    marginTop: 20,
    textAlign: 'left',
    marginBottom: -15,
  },
  midtitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 3,
    textAlign: 'left',
  },
  apptitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFE70A',
    marginBottom: 3,
    textAlign: 'left',
  },
  description: {
    alignItems: 'center',
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
});

export default IntroScreen;

import React from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import GradientButton from '../components/GradientButton';
import LinearGradient from 'react-native-linear-gradient'; // Fix import

const IntroScreen = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('AuthNavigator');
  };

  return (
    <View className="w-full h-full px-4" style={{backgroundColor: '#000000'}}>
      <StatusBar backgroundColor="#000000" />

      {/* Top gradient for the status bar */}

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
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.midtitle}>
          to <Text style={styles.apptitle}>SanketBani</Text>
        </Text>

        <Text style={styles.description} className="text-slate-200 mt-2">
          Easily connect with everyone using Indian Sign Language (ISL).
          Translate text, speech, and gestures to bridge the gap between deaf,
          mute, and hearing communities.
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
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 650,
    resizeMode: 'cover',
    transform: [{scale: 0.8}],
    top: 80,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  topGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100, // Slightly increased for more smoothness
    zIndex: 1,
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

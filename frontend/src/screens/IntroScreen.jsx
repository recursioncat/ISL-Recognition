import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  StyleSheet 
} from 'react-native';

import GradientButton from '../components/GradientButton';
import GradientBackground from '../components/GradientBackground';

const IntroScreen = ({ navigation }) => {
  return (
    <View className="w-full h-full"> 
     {/* <GradientBackground/> */}
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#000000"
      />
     
      <Image source={require('../assets/homepageImg.png')} style={styles.homepageImg} />
     
      
      <Text style={styles.title}>Welcome </Text>
      <Text style={styles.midtitle}>to <Text style={styles.apptitle}>SanketBani</Text></Text>
      
      <Text style={styles.description}>
        Your AI-powered communication platform bridging the gap between the deaf and hearing communities.
        Start your journey to seamless communication today.
      </Text>
      
      <GradientButton />

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    fontFamily: 'sans-serif',
  },
  homepageImg: {
    resizeMode: 'center',
    width: 300,
    height: 300,
    marginVertical: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'left',
    marginBottom: -15,
  },
  midtitle: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
    textAlign: 'left',
  },
  apptitle: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#FFE70A', 
    marginBottom: 3,
    textAlign: 'left',
  },
  description: {
    alignItems: 'center',
    fontSize: 20,
    lineHeight: 28,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
  },
 
});

export default IntroScreen;

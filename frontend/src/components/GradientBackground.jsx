import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientBackground() {
  return (
    <View style={styles.container}>
      {/* Configure the status bar appearance */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {/* Apply gradient background */}
      <LinearGradient
        colors={['rgba(255, 223, 142, 0.7)', 'rgba(0, 0, 0, 1)']}  // Gradient from golden to black
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}  // Gradient direction
        style={styles.gradient}  // Style to control gradient positioning and size
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Full black background for the whole screen
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,  // Adjust height as needed
  },
});

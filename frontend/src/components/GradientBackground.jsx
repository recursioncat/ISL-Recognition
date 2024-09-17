import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientBackground() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['rgba(255, 223, 142, 0.7)', 'rgba(0, 0, 0, 1)']}  // Gradient from golden to black
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}  // Gradient direction
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,  // Ensures the gradient covers the full screen
  },
  gradient: {
    flex: 1,
    zIndex: -1,  // Puts the gradient behind other components
  },
});

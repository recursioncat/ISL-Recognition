import React from 'react'; 
import { View, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Define the height for the status bar area
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

export default function GradientBackground() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {/* Base Gradient: Golden to Pink (Horizontal Blend) */}
      <LinearGradient
        colors={[
          'rgba(255, 223, 142, 0.5)',  // Golden
          'rgba(250, 219, 216, 0.5)'   // Light pink
        ]}
        start={{ x: 0, y: 0 }}   // Start from the left
        end={{ x: 1, y: 0 }}     // End at the right
        style={styles.baseGradient}
      />
      {/* Overlay Gradient: Pink to Black (Vertical Blend) */}
      <LinearGradient
        colors={[
          'rgba(250, 219, 216, 0.2)',  // Light pink
          'rgba(0, 0, 0, 0.5)',        // Black with partial transparency
          'rgba(0, 0, 0, 1)'           // Solid black
        ]}
        start={{ x: 0, y: 0 }}   // Start from the top
        end={{ x: 0, y: 1 }}     // End at the bottom
        style={styles.overlayGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT + 90,  // Adjust height as necessary
    zIndex: -1,
  },
  baseGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,  // Ensure this is above the overlay gradient
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,  // Ensure this is below the base gradient
  },
});

import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({onPress}) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          colors={['#F4D03F', '#FADBD8']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>Let's Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 340, // Adjust width according to preference
    borderColor: '#F4D03F', // Matching the start color of the gradient
    borderWidth: 3, // 3px border width
    overflow: 'hidden',
    padding: 2 // Ensure gradient respects border radius
  },
  gradient: {
    padding: 15, // Padding to increase button height and space around text
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000', // Black text color
    fontSize: 18, // Font size similar to the image
    fontWeight: 'bold', // Bold font style
  },
});

export default GradientButton;

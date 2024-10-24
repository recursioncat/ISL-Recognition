import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({onPress, text}) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          colors={['#F4D03F', '#FADBD8']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{text}</Text>
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
    width: 340, 
    borderColor: '#F4D03F',
    borderWidth: 3, 
    overflow: 'hidden',
    padding: 2
  },
  gradient: {
    padding: 12, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
});

export default GradientButton;

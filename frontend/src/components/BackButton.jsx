import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BackButton({ goBack}) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <MaterialIcons name="arrow-back" color={"white"} size={25} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
